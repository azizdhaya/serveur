@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM Script Windows pour preparer et lancer backend + frontend
REM Usage:
REM   demarrer-app.bat         -> installe si necessaire puis lance les 2 serveurs
REM   demarrer-app.bat --check -> verifie/installe sans lancer les serveurs

cd /d "%~dp0"

set "CHECK_ONLY=0"
if /I "%~1"=="--check" set "CHECK_ONLY=1"

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERREUR] npm est introuvable. Installez Node.js puis reessayez.
  exit /b 1
)

if not exist "backend\package.json" (
  echo [ERREUR] Dossier backend introuvable ou incomplet.
  exit /b 1
)
if not exist "frontend\package.json" (
  echo [ERREUR] Dossier frontend introuvable ou incomplet.
  exit /b 1
)

call :ensure_deps "backend" "Backend"
if errorlevel 1 exit /b 1

call :ensure_deps "frontend" "Frontend"
if errorlevel 1 exit /b 1

call :prepare_prisma
if errorlevel 1 exit /b 1

if "%CHECK_ONLY%"=="1" (
  echo.
  echo [OK] Verification terminee. Aucun serveur lance avec l'option --check.
  exit /b 0
)

echo.
echo [INFO] Lancement des serveurs de developpement...
start "Backend - photovoltaique" cmd /k "cd /d ""%~dp0backend"" && npm run dev"
start "Frontend - photovoltaique" cmd /k "cd /d ""%~dp0frontend"" && npm run dev"
echo [OK] Backend et frontend lances dans deux fenetres separees.
exit /b 0

:ensure_deps
set "DIR=%~1"
set "LABEL=%~2"
echo.
echo [INFO] %LABEL% : verification des dependances...

pushd "%DIR%" >nul
if not exist "node_modules" (
  echo [INFO] %LABEL% : node_modules absent, installation...
  call npm install
  if errorlevel 1 (
    echo [ERREUR] %LABEL% : echec de npm install.
    popd >nul
    exit /b 1
  )
) else (
  echo [INFO] %LABEL% : dependances deja presentes.
)
popd >nul
exit /b 0

:prepare_prisma
echo.
echo [INFO] Backend : preparation Prisma...
pushd "backend" >nul

if exist "prisma\schema.mongodb.prisma" (
  call npm run prisma:generate:mongo >nul 2>&1
  if errorlevel 1 (
    echo [WARN] prisma:generate:mongo a echoue, tentative prisma:generate...
    call npm run prisma:generate >nul 2>&1
    if errorlevel 1 (
      echo [ERREUR] Generation Prisma impossible.
      popd >nul
      exit /b 1
    )
  )
) else (
  call npm run prisma:generate >nul 2>&1
  if errorlevel 1 (
    echo [ERREUR] Generation Prisma impossible.
    popd >nul
    exit /b 1
  )
)

popd >nul
echo [INFO] Prisma pret.
exit /b 0
