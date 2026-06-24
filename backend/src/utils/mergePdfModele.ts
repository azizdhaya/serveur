import { PDFDocument } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Fichier copié depuis le modèle métier (`backend/assets/modele-pdf.pdf`). */
function resolveModelePath(): string | null {
  const envPath = process.env.PDF_MODELE_PATH?.trim();
  if (envPath && fs.existsSync(envPath)) return envPath;
  const rel = path.join(__dirname, "../../assets/modele-pdf.pdf");
  if (fs.existsSync(rel)) return rel;
  return null;
}

/**
 * - `append` (défaut) : rapport jsPDF puis pages du modèle (pied / mentions légales en fin).
 * - `prepend` : pages du modèle d’abord (en-tête / couverture), puis le rapport.
 */
function modelePosition(): "prepend" | "append" {
  const v = process.env.PDF_MODELE_POSITION?.trim().toLowerCase();
  if (v === "prepend" || v === "first" || v === "debut") return "prepend";
  return "append";
}

/**
 * Fusionne le PDF généré (jsPDF) avec le PDF modèle du dossier `assets/`.
 * Si le fichier est absent, renvoie le buffer d’origine.
 */
export async function mergePdfWithModele(
  generatedPdf: Uint8Array | Buffer
): Promise<Buffer> {
  const modelePath = resolveModelePath();
  if (!modelePath) return Buffer.from(generatedPdf);

  const modeleBytes = fs.readFileSync(modelePath);
  const modeleDoc = await PDFDocument.load(modeleBytes);
  const genDoc = await PDFDocument.load(
    generatedPdf instanceof Buffer ? new Uint8Array(generatedPdf) : generatedPdf
  );

  const out = await PDFDocument.create();
  const order = modelePosition();
  const modeleIdx = modeleDoc.getPageIndices();
  const genIdx = genDoc.getPageIndices();

  const copyAll = async (src: PDFDocument, indices: number[]) => {
    for (const i of indices) {
      const [p] = await out.copyPages(src, [i]);
      out.addPage(p);
    }
  };

  if (order === "prepend") {
    await copyAll(modeleDoc, modeleIdx);
    await copyAll(genDoc, genIdx);
  } else {
    await copyAll(genDoc, genIdx);
    await copyAll(modeleDoc, modeleIdx);
  }

  return Buffer.from(await out.save());
}
