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
  announcements.map(e => {
    e.created_ts = new Date(e.created_ts)
    e.updated_ts = new Date(e.updated_ts)
  })
  return announcements
}