import db, { FeedEntry, UserRow } from '../../db'
import projects from './projects'
import announcements from './announcements'
import users from './users'

type Args = {
  audience: string;
  limit: number;
  cursor?: Date;
}

type Fellowship = "founders" | "angels" | "writers"
type ContentConfig = {
  'announcement'?: (Fellowship | "all")[],
  'user'?: Fellowship[],
  'project'?: Fellowship[]
}

/*
Founders want to connect to angels and other founders.
Angels want to connect to founders and other angels.
Founders and angels are interested in new founders' projects.
Writers want to connect only to other writers and are not interested in founders' projects.
*/
const audienceContent: Record<Fellowship, ContentConfig> = {
  'founders': {
    'announcement': ['all', 'founders'],
    'user': ['founders', 'angels'],
    'project': ['founders']
  },
  'angels': {
    'announcement': ['all', 'angels'],
    'user': ['founders', 'angels'],
    'project': ['founders']
  },
  'writers': {
    'announcement': ['all', 'writers'],
    'user': ['writers']
  }
}

export default async function feed(parent: unknown, { audience, limit, cursor }: Args): Promise<FeedEntry[]> {
  const content = audienceContent[audience as Fellowship]
  if (!content) {
    throw new Error(`no available feed for ${audience}`)
  }
  const promises: Promise<FeedEntry[]>[] = []

  if (content.announcement) {
    promises.push(announcements(parent, { fellowships: content.announcement, limit, cursor }))
  }
  if (content.project) {
    promises.push(projects(parent, { fellowships: content.project, limit, cursor }))
  }
  if (content.user) {
    promises.push(users(parent, { fellowships: content.user, limit, cursor }))
  }

  const entries = (await Promise.all(promises))
    .flat()
    .sort((a, b) => new Date(b.created_ts).getTime() - new Date(a.created_ts).getTime())
    .slice(0, limit)

  return entries
}