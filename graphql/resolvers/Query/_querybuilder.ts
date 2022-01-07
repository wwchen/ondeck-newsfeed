export const paginatedQuery = (query: string, fellowships: string[], limit: number, cursor?: Date, tablePrefix?: string) => {
  if (fellowships) {
    const options = fellowships.map(x => `'${x}'`).join(', ')
    query += ` WHERE fellowship IN (${options})`
  }
  if (cursor) {
    query += ` AND ${tablePrefix || ''}created_ts < '${cursor}'`
  }
  if (limit) {
    query += ` ORDER BY ${tablePrefix || ''}created_ts DESC LIMIT ${limit} `
  }
  return query;
}