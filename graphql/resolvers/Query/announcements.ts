import db, { AnnouncementRow } from '../../db'

type Args = {
  fellowships: string[]
}

export default async function announcements(parent: unknown, { fellowships }: Args): Promise<AnnouncementRow[]> {
  let query = `SELECT * FROM announcements`

  if (fellowships) {
    const options = fellowships.map(x => `'${x}'`).join(', ')
    query += ` WHERE fellowship IN (${options})`
  }
  const announcements: AnnouncementRow[] | undefined = await db.getAll(query)
  if (!announcements) {
    throw new Error(`Announcements not found`)
  }
  return announcements
}