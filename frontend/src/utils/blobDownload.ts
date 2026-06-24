/** Détection navigateur mobile / tablette (export blob). */
export function isMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return true;
  }
  return navigator.maxTouchPoints > 1 && /MacIntel|iPad/i.test(navigator.platform);
}

function isPdfBlob(data: Blob, filename: string): boolean {
  return data.type.includes("pdf") || filename.toLowerCase().endsWith(".pdf");
}

async function tryNativeShare(data: Blob, filename: string): Promise<boolean> {
  if (typeof navigator.share !== "function" || typeof navigator.canShare !== "function") {
    return false;
  }
  try {
    const type =
      data.type ||
      (filename.toLowerCase().endsWith(".pdf")
        ? "application/pdf"
        : filename.toLowerCase().endsWith(".xlsx")
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/octet-stream");
    const file = new File([data], filename, { type });
    if (!navigator.canShare({ files: [file] })) return false;
    await navigator.share({ files: [file], title: filename });
    return true;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return true;
    return false;
  }
}

function writeWaitingDocument(popup: Window, message: string) {
  popup.document.open();
  popup.document.write(
    `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Export</title></head><body style="font-family:system-ui,sans-serif;padding:24px;color:#334155;line-height:1.5"><p>${message}</p></body></html>`
  );
  popup.document.close();
}

function openInPagePdfViewer(url: string, filename: string) {
  const overlay = document.createElement("div");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "Aperçu PDF");
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:9999;background:#fff;display:flex;flex-direction:column";

  const header = document.createElement("div");
  header.style.cssText =
    "display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid #e2e8f0;background:#f8fafc";

  const title = document.createElement("p");
  title.textContent = filename;
  title.style.cssText =
    "margin:0;font:600 14px system-ui,sans-serif;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "Fermer";
  closeBtn.style.cssText =
    "flex-shrink:0;border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:8px 12px;font:500 14px system-ui,sans-serif";

  const openBtn = document.createElement("a");
  openBtn.href = url;
  openBtn.target = "_blank";
  openBtn.rel = "noopener noreferrer";
  openBtn.textContent = "Ouvrir";
  openBtn.style.cssText =
    "flex-shrink:0;border-radius:8px;padding:8px 12px;background:#0081c4;color:#fff;text-decoration:none;font:500 14px system-ui,sans-serif";

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.title = filename;
  iframe.style.cssText = "flex:1;width:100%;border:0;background:#fff";

  const cleanup = () => {
    overlay.remove();
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", cleanup);
  header.append(title, openBtn, closeBtn);
  overlay.append(header, iframe);
  document.body.style.overflow = "hidden";
  document.body.appendChild(overlay);
}

export type BlobDownloadSession = {
  /** À appeler de façon synchrone au clic, avant tout await. */
  begin: () => void;
  deliver: (data: Blob, filename: string) => Promise<"shared" | "opened" | "downloaded">;
  cancel: () => void;
  wasPopupBlocked: () => boolean;
};

/** Prépare une fenêtre (mobile) pour conserver le geste utilisateur pendant l’appel API. */
export function createBlobDownloadSession(): BlobDownloadSession {
  let popup: Window | null = null;
  let popupBlocked = false;

  return {
    begin() {
      if (!isMobileBrowser()) return;
      popup = window.open("about:blank", "_blank");
      if (popup) {
        writeWaitingDocument(popup, "Génération du document en cours…");
      } else {
        popupBlocked = true;
      }
    },
    deliver(data: Blob, filename: string) {
      const target = popup;
      popup = null;
      return deliverBlob(data, filename, target);
    },
    cancel() {
      if (popup && !popup.closed) popup.close();
      popup = null;
    },
    wasPopupBlocked: () => popupBlocked,
  };
}

/** Envoie un blob vers le téléchargement, l’aperçu ou le partage natif. */
export async function deliverBlob(
  data: Blob,
  filename: string,
  preparedPopup: Window | null = null
): Promise<"shared" | "opened" | "downloaded"> {
  const url = URL.createObjectURL(data);
  const cleanup = () => {
    window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
  };

  if (isMobileBrowser()) {
    const shared = await tryNativeShare(data, filename);
    if (shared) {
      cleanup();
      preparedPopup?.close();
      return "shared";
    }
  }

  if (preparedPopup && !preparedPopup.closed) {
    try {
      if (isPdfBlob(data, filename)) {
        preparedPopup.location.href = url;
        preparedPopup.focus?.();
      } else {
        writeWaitingDocument(
          preparedPopup,
          "Fichier prêt. Si le téléchargement ne démarre pas, revenez à l’application et réessayez."
        );
        const a = preparedPopup.document.createElement("a");
        a.href = url;
        a.download = filename;
        a.textContent = `Télécharger ${filename}`;
        a.style.display = "inline-block";
        a.style.marginTop = "16px";
        a.style.padding = "12px 16px";
        a.style.background = "#0081c4";
        a.style.color = "#fff";
        a.style.borderRadius = "8px";
        a.style.textDecoration = "none";
        preparedPopup.document.body.appendChild(a);
        a.click();
      }
      cleanup();
      return isPdfBlob(data, filename) ? "opened" : "downloaded";
    } catch {
      preparedPopup.close();
    }
  }

  if (isMobileBrowser() && isPdfBlob(data, filename)) {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (opened) {
      cleanup();
      return "opened";
    }
    openInPagePdfViewer(url, filename);
    cleanup();
    return "opened";
  }

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  cleanup();
  preparedPopup?.close();
  return "downloaded";
}
