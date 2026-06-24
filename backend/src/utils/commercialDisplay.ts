/** Même logique que le front (`formatCommercialDisplayName`) : colonne Excel « Agent Commercial ». */
export function formatCommercialExcelCell(agent: {
  nom: string;
  prenom: string;
}): string {
  const n = agent.nom.trim();
  const pr = agent.prenom.trim();
  const parts = [n, pr].filter((x) => x && x !== "-");
  return `MR ${parts.join(" ")}`.trim().toUpperCase();
}
