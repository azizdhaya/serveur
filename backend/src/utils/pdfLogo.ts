import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Chemin absolu d’une image logo (PNG ou JPEG).
 * Priorité : `PDF_LOGO_PATH` → `assets/logo.png` → `logo.jpg` / `logo.jpeg`.
 */
export function resolvePdfLogoPath(): string | null {
  const env = process.env.PDF_LOGO_PATH?.trim();
  if (env && fs.existsSync(env)) return env;
  const base = path.join(__dirname, "../../assets");
  for (const name of ["logo.png", "logo.jpg", "logo.jpeg"]) {
    const p = path.join(base, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export type PdfLogoFormat = "PNG" | "JPEG";

/** Boîte max (mm) pour le logo en-tête liste PDF (le visuel garde son ratio). */
export function getPdfListeLogoMaxBoxMm(): { maxW: number; maxH: number } {
  const w = Number(process.env.PDF_LOGO_MAX_WIDTH_MM ?? process.env.PDF_LOGO_WIDTH_MM);
  const h = Number(process.env.PDF_LOGO_MAX_HEIGHT_MM ?? process.env.PDF_LOGO_HEIGHT_MM);
  const maxW = Number.isFinite(w) && w > 20 && w < 160 ? w : 78;
  const maxH = Number.isFinite(h) && h > 8 && h < 90 ? h : 22;
  return { maxW, maxH };
}

/** Lecture taille pixel depuis l’en-tête PNG (chunk IHDR). */
function readPngPixelSize(buf: Buffer): { w: number; h: number } | null {
  if (buf.length < 24) return null;
  const sig = buf.subarray(0, 8).toString("hex");
  if (sig !== "89504e470d0a1a0a") return null;
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (!width || !height || width > 65536 || height > 65536) return null;
  return { w: width, h: height };
}

/** Lecture taille pixel JPEG via segments SOF (SOF0..SOF3, SOF5..SOF7, SOF9..SOF11). */
function readJpegPixelSize(buf: Buffer): { w: number; h: number } | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let offset = 2;
  const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb]);
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    let marker = buf[offset + 1];
    while (marker === 0xff && offset + 2 < buf.length) {
      offset += 1;
      marker = buf[offset + 1];
    }
    offset += 2;
    if (marker === 0xd9 || marker === 0xda) break;
    if (offset + 2 > buf.length) break;
    const segLen = buf.readUInt16BE(offset);
    if (segLen < 2 || offset + segLen > buf.length) break;
    if (sofMarkers.has(marker) && segLen >= 7) {
      const h = buf.readUInt16BE(offset + 3);
      const w = buf.readUInt16BE(offset + 5);
      if (w > 0 && h > 0 && w <= 65536 && h <= 65536) return { w, h };
      return null;
    }
    offset += segLen;
  }
  return null;
}

/**
 * Dimensions d’affichage du logo (mm) en conservant le ratio de l’image,
 * dans la boîte `getPdfListeLogoMaxBoxMm()`. Sans PNG lisible : fallback 72×20.
 */
export function getPdfListeLogoDrawMm(absolutePath: string): { w: number; h: number } {
  const { maxW, maxH } = getPdfListeLogoMaxBoxMm();
  const ext = path.extname(absolutePath).toLowerCase();
  /* JPEG : pas d’en-tête simple sans dépendance ; ratio type logo paysage. */
  if (ext !== ".png") {
    return fitMmBox(maxW, maxW / 3.35, maxW, maxH);
  }
  try {
    const buf = fs.readFileSync(absolutePath);
    const px = readPngPixelSize(buf);
    if (!px || px.h <= 0) {
      return fitMmBox(maxW, maxW / 3.35, maxW, maxH);
    }
    const aspect = px.w / px.h;
    return fitMmBox(maxW, maxW / aspect, maxW, maxH);
  } catch {
    return fitMmBox(maxW, maxW / 3.35, maxW, maxH);
  }
}

/** Dimensions d’affichage (mm) pour un logo `data:image/...;base64,...`, ratio conservé. */
export function getPdfListeLogoDrawMmFromDataUrl(dataUrl: string): { w: number; h: number } {
  const { maxW, maxH } = getPdfListeLogoMaxBoxMm();
  const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!m) return fitMmBox(maxW, maxW / 3.35, maxW, maxH);
  const mime = m[1].toLowerCase();
  const b64 = m[2];
  try {
    const buf = Buffer.from(b64, "base64");
    const px =
      mime === "image/png"
        ? readPngPixelSize(buf)
        : mime === "image/jpeg" || mime === "image/jpg"
          ? readJpegPixelSize(buf)
          : null;
    if (!px || px.h <= 0) return fitMmBox(maxW, maxW / 3.35, maxW, maxH);
    const aspect = px.w / px.h;
    return fitMmBox(maxW, maxW / aspect, maxW, maxH);
  } catch {
    return fitMmBox(maxW, maxW / 3.35, maxW, maxH);
  }
}

function fitMmBox(
  candidateW: number,
  candidateH: number,
  maxW: number,
  maxH: number
): { w: number; h: number } {
  let w = Math.min(candidateW, maxW);
  let h = w > 0 ? w / (candidateW / candidateH) : maxH;
  if (h > maxH) {
    h = maxH;
    w = h * (candidateW / candidateH);
  }
  const round1 = (n: number) => Math.round(n * 10) / 10;
  return { w: round1(w), h: round1(h) };
}

/** Fallback sans lecture du fichier (tests / ancien code). */
export function getPdfListeLogoSizeMm(): { w: number; h: number } {
  const { maxW, maxH } = getPdfListeLogoMaxBoxMm();
  return fitMmBox(maxW, maxW / 3.35, maxW, maxH);
}

export function loadPdfLogoForJsPdf(
  absolutePath: string
): { dataUri: string; format: PdfLogoFormat } | null {
  const ext = path.extname(absolutePath).toLowerCase();
  let format: PdfLogoFormat = "PNG";
  if (ext === ".jpg" || ext === ".jpeg") format = "JPEG";
  else if (ext !== ".png") return null;
  try {
    const buf = fs.readFileSync(absolutePath);
    const mime = format === "JPEG" ? "image/jpeg" : "image/png";
    return {
      dataUri: `data:${mime};base64,${buf.toString("base64")}`,
      format,
    };
  } catch {
    return null;
  }
}
