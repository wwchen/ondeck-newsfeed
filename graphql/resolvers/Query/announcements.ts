import db, { AnnouncementRow } from '../../db'
import { paginatedQuery } from './_querybuilder'

type Args = {
  fellowships: string[];
  limit: number;
  cursor?: Date;
}

export default async function announcements(parent: unknown, { fellowships, limit, cursor }: Args): Promise<AnnouncementRow[]> {
  const query = paginatedQuery('SELECT * FROM announcements', fellowships, limit, cursor)

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