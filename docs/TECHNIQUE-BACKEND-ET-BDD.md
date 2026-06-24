# Documentation technique — API et base de données

Ce document résume la pile backend, le schéma MongoDB (Prisma), l’authentification, les endpoints HTTP et les règles d’accès par rôle pour le tableau de bord photovoltaïque.

**Emplacement du backend :** `backend/`  
**Schéma Prisma :** `backend/prisma/schema.prisma`  
**Point d’entrée HTTP :** `backend/src/index.ts` (préfixe `/api`)

---

## 1. Pile technique

| Couche | Technologie |
|--------|-------------|
| Runtime | Node.js, TypeScript (ESM) |
| Framework HTTP | Express |
| ORM | Prisma (`@prisma/client`) |
| Base de données | MongoDB (`provider = "mongodb"` dans `schema.prisma`) |
| Validation des corps de requête | Zod (`backend/src/validation/schemas.ts`) |
| Authentification | JWT : access token (court) + refresh token (long), sessions persistées en base |
| Hachage des mots de passe | bcrypt (via utilitaires du projet) |
| Import Excel | `multer` (fichier en mémoire) + `xlsx` |
| Export PDF | `jspdf`, éventuellement fusion avec modèle (`pdf-lib`) selon la fonction |

> **Replica set :** le fichier `.env.example` indique que Prisma MongoDB attend souvent une configuration de type replica set ; le script `scripts/enable-mongo-replicaset.ps1` est mentionné dans les commentaires de configuration.

---

## 2. Variables d’environnement (backend)

Principales variables (voir `backend/.env.example`) :

| Variable | Rôle |
|----------|------|
| `DATABASE_URL` | URI MongoDB (base `photovoltaique_dashboard`, timeouts possibles) |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Clés de signature des JWT |
| `JWT_ACCESS_EXPIRES` / `JWT_REFRESH_EXPIRES` | Durée de vie (ex. `15m` / `7d`) |
| `PORT` | Port d’écoute (défaut **8787**) |
| `HOST` | Hôte d’écoute (défaut `0.0.0.0`) |
| `NODE_ENV` | `development` / `production` (CORS : en prod, `FRONTEND_URL`) |
| `FRONTEND_URL` | Origine autorisée en production pour CORS |
| `SKIP_DEV_ADMIN_BOOTSTRAP` | Si `1`, désactive la création du compte admin de développement au démarrage |

Endpoints de santé publics (sans JWT) :

- `GET /health` et `GET /api/health` → `{ ok: true }`

---

## 3. Schéma de données simplifié (Prisma / MongoDB)

### 3.1 Énumérations (`backend/prisma/schema.prisma`)

- **`Role`** : `SUPER_ADMIN`, `ADMIN`, `TECHNICIEN`, `COMMERCIAL`
- **`EtatDossier`** : `OUVERT`, `EN_NEGOCIATION`, `FINIE`, `ARCHIVE`, `ABANDONNE`
- **`StatutApprobation`** : `APPROUVE`, `PAS_ENCORE`, `NEANT`, `EN_ATTENTE`, `REJETE`, `ABANDONNE`
- **`TypeContrat`** : `PROGRAMME_PROSOL`, `HORS_PROGRAMME_PROSOL`
- **`TypeCompteur`** : `MONOPHASE`, `TRIPHASE`
- **`TypeProjet`** : `PHOTOVOLTAIQUE_CLASSIQUE`, `POMPAGE`, `ISOLE_AVEC_BATTERIES`
- **`ClassementDossier`** : `ARCHIVE`, `NON_ARCHIVE`

### 3.2 Modèles et relations

```
User
  ├── Session[]      (refreshToken, expiresAt)
  ├── Projet[]       (relation "AgentCommercial" via agentCommercialId)
  └── ActionLog[]

Projet
  ├── agentCommercialId → User (optionnel)
  ├── champs identité / localisation (référence, abonnés, adresse, GPS, etc.)
  ├── champs métier PV / pompage / isolé (puissance, modules, onduleurs, dates, financement…)
  ├── contratAchat (TypeContrat), conditionSubvention / saisies / déblocages (String)
  ├── Echeance[]     (montants / dates d’échéancier)
  └── ActionLog[]

Echeance
  └── projetId → Projet (cascade à la suppression)

ActionLog
  ├── userId → User
  └── projetId → Projet (optionnel, SetNull si projet supprimé)
```

Les index principaux sur `Projet` couvrent notamment : état + classement, lieu géographique, agent commercial, contrat, références administratives (CIN, code-barres, devis, facture), dates.

### 3.3 Corps de requête typique pour un projet

La validation Zod `projetBodySchema` (`backend/src/validation/schemas.ts`) définit les champs acceptés pour **création** et **mise à jour** : identité client, type de projet, statuts, dates (souvent en chaînes ISO ou vides), montants (string ou nombre puis normalisation numérique), tableau `echeances`, etc.  
Les dates envoyées par le client sont ensuite converties côté service selon la logique métier (fonctions du type `optDate` dans le service projet).

---

## 4. Authentification

1. **Login** : `POST /api/auth/login` avec `{ email, password }`.  
   Réponse typique : `{ accessToken, refreshToken, user }` (utilisateur « public » sans mot de passe).

2. **Requêtes authentifiées** : en-tête  
   `Authorization: Bearer <accessToken>`

3. **Rafraîchissement** : `POST /api/auth/refresh` avec `{ refreshToken }`.

4. **Déconnexion** : `POST /api/auth/logout` avec `{ refreshToken }` (réponse **204**).

5. **Payload JWT access** : `sub` (id utilisateur), `email`, `role` (enum Prisma `Role`).

---

## 5. Table des endpoints API

Tous les chemins ci-dessous sont relatifs à l’origine de l’API (ex. `http://localhost:8787`).  
Sauf mention **Public**, une authentification par Bearer est requise.

### 5.1 Authentification — `/api/auth`

| Méthode | Chemin | Auth | Corps / paramètres |
|---------|--------|------|---------------------|
| POST | `/login` | Public | `{ email, password }` |
| POST | `/refresh` | Public | `{ refreshToken }` |
| POST | `/logout` | Public | `{ refreshToken }` → **204** |
| GET | `/me` | Bearer | — → profil utilisateur |
| PATCH | `/change-password` | Bearer | `{ currentPassword, newPassword }` (min 8 car.) → **204** |
| GET | `/activity` | Bearer | `?limit` (nombre) — **SUPER_ADMIN** ou **ADMIN** uniquement |

### 5.2 Utilisateurs — `/api/users`

| Méthode | Chemin | Rôles autorisés (middleware) | Description |
|---------|--------|------------------------------|-------------|
| GET | `/commercials` | Tout utilisateur connecté | Liste des commerciaux (usage formulaires, etc.) |
| GET | `/` | SUPER_ADMIN, ADMIN | Liste des utilisateurs |
| GET | `/:id` | SUPER_ADMIN, ADMIN | Détail utilisateur |
| POST | `/` | SUPER_ADMIN, ADMIN | Création (schéma `userCreateSchema` ; pas de création SUPER_ADMIN via ce schéma) |
| PUT | `/:id` | SUPER_ADMIN, ADMIN | Mise à jour (`userUpdateSchema`) |
| PATCH | `/:id/toggle` | SUPER_ADMIN, ADMIN | Activer / désactiver |
| DELETE | `/:id` | **SUPER_ADMIN** seul | Suppression |
| POST | `/:id/reset-password` | SUPER_ADMIN, ADMIN | Réinitialisation du mot de passe |

### 5.3 Projets — `/api/projets`

Toutes les routes passent par `authenticate`.

| Méthode | Chemin | Rôles / notes | Description |
|---------|--------|----------------|-------------|
| GET | `/export/excel` | Tous | Export Excel ; filtres via **query** (`ProjetListQuery`) ; sélection par IDs possible via `search=ids:id1,id2` |
| POST | `/export/excel` | Tous | Même logique + corps JSON : filtres + `columns` (export colonnes sur mesure) |
| GET | `/export/pdf/columns` | Tous | Métadonnées des colonnes PDF (liste des clés et libellés) |
| GET | `/export/pdf` | Tous | Export PDF liste (query = filtres + colonnes) |
| POST | `/export/pdf` | Tous | Idem avec filtres/colonnes dans le **corps** (URLs longues) |
| POST | `/import` | **SUPER_ADMIN, ADMIN, TECHNICIEN** | Upload `multipart/form-data`, champ fichier `file` |
| POST | `/archive` | Tous | `{ ids: string[], archive: boolean }` |
| GET | `/` | Tous | Liste paginée + filtres (query : voir § 5.5) |
| POST | `/` | Tous | Création — corps `projetBodySchema` normalisé |
| GET | `/:id/export/pdf` | Tous | PDF fiche projet unique |
| GET | `/:id` | Tous | Détail projet |
| PUT | `/:id` | Tous | Mise à jour — même schéma que la création |
| DELETE | `/:id` | **SUPER_ADMIN** ou **ADMIN** | Suppression |

**Service métier :** l’import Excel refuse explicitement le rôle **COMMERCIAL** (`403`), en plus du middleware de route.

### 5.4 Statistiques — `/api/stats`

Toutes les routes : **Bearer** requis ; pas de `authorize` dans `stats.routes.ts` (tout rôle connecté).

| GET | Chemin |
|-----|--------|
| `/dashboard` | |
| `/par-district` | |
| `/par-etat` | |
| `/par-contrat-achat` | |
| `/par-mois` | |
| `/financier` | |
| `/prosol-par-district` | |
| `/par-deblocage` | |
| `/recoulement-par-district` | |
| `/diligences-par-district` | |

Les paramètres exacts dépendent des contrôleurs `stats.controller.ts` (filtres éventuels en query).

### 5.5 Filtres de liste projet (query `ProjetListQuery`)

Utilisés notamment par `GET /api/projets` et les exports. Champs principaux (tous optionnels, souvent des chaînes) :

pagination : `page`, `limit` ; recherche : `search` ; filtres : `etat`, `district`, `contrat`, `typeProjet`, `banque`, `agentId`, `classement`, champs géographiques, approbations, compteur, références, marques/modèles, montants min/max, `tauxInteret`, `lotDeblocage`, plage de dates `dateFrom` / `dateTo` / `dateField`, tri : `sortBy`, `order`, etc.

(détail complet dans `backend/src/services/projet.service.ts`, type `ProjetListQuery`.)

---

## 6. Règles par rôle (récapitulatif)

| Rôle | Accès API typique |
|------|-------------------|
| **SUPER_ADMIN** | Accès complet utilisateurs (y compris suppression) ; routes admin auth (`/activity`) ; toutes routes projets y compris suppression ; import Excel. |
| **ADMIN** | Comme SUPER_ADMIN sauf **DELETE** utilisateur (réservé SUPER_ADMIN) ; `/activity` ok. |
| **TECHNICIEN** | Pas de gestion des utilisateurs (liste/détail/CRUD) ; import Excel autorisé ; projets : pas de DELETE projet via route (réservé ADMIN/SUPER_ADMIN). |
| **COMMERCIAL** | Utilisateurs : seulement `GET /api/users/commercials` ; pas d’import Excel (403 dans le service) ; pas de suppression de projet. |

### 6.1 Point d’attention : filtrage « commercial » côté backend

Dans `projet.service.ts`, la fonction `commercialFilter` retourne actuellement **`null`** (aucun filtre supplémentaire pour les commerciaux).  
Dans `stats.service.ts`, `commercialWhere` retourne un objet **`{}`** (pas de restriction par `agentCommercialId`).

Conséquence : **un utilisateur COMMERCIAL authentifié peut, côté API, lister / lire / modifier des projets comme les autres rôles non restreints par middleware** — la limitation stricte à « ses seuls dossiers » n’est pas appliquée dans ces services. Le tableau de bord frontend peut masquer des sections (UX), mais la sécurité serveur doit être alignée si l’exigence métier est de isoler les données par commercial.

---

## 7. Fichiers utiles pour la maintenance

| Sujet | Fichiers |
|-------|----------|
| Routes | `backend/src/routes/*.routes.ts` |
| Contrôleurs | `backend/src/controllers/*.controller.ts` |
| Logique métier projets / exports | `backend/src/services/projet.service.ts` |
| Statistiques | `backend/src/services/stats.service.ts` |
| Auth | `backend/src/services/auth.service.ts`, `middleware/auth.middleware.ts`, `middleware/role.middleware.ts` |
| JWT | `backend/src/utils/jwt.ts` |
| Validation Zod | `backend/src/validation/schemas.ts` |

---

*Document généré à partir du code du dépôt ; en cas de divergence, le code source fait foi.*
