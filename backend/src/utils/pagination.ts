export function parsePagination(query: {
  page?: string;
  limit?: string;
}): { page: number; limit: number; skip: number } {
  const page = Math.max(1, parseInt(query.page ?? "1", 10) || 1);
  const raw = parseInt(query.limit ?? "25", 10) || 25;
  const limit = Math.min(100, Math.max(1, raw));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
