/** Aligné sur `backend/.env` → `PORT` et sur `.env.development` → `VITE_API_PORT`. */
export const DEV_API_PORT = Number(
  import.meta.env.VITE_API_PORT || 8787
);
