import db, { FeedEntry, UserRow } from '../../db'
import projects from './projects'
import announcements from './announcements'
import users from './users'

type Args = {
  audience: string;
}

/*
Founders want to connect to angels and other founders.
Angels want to connect to founders and other angels.
Founders and angels are interested in new founders' projects.
Writers want to connect only to other writers and are not interested in founders' projects.
*/
const audienceContent: Record<string, Record<string, string[]>> = {
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

export default async function feed(parent: unknown, { audience }: Args): Promise<FeedEntry[]> {
  // todo add pagination
  const content = audienceContent[audience]
  if (!content) {
    throw new Error(`no available feed for ${audience}`)
  }
  const promises: Promise<FeedEntry[]>[] = []
  if (content['user']) {
    promises.push(users(parent, { fellowships: content['user'] }))
  }
  if (content['announcement']) {
    promises.push(announcements(parent, { fellowships: content['announcement'] }))
  }
  if (content['project']) {
    promises.push(projects(parent, { fellowships: content['project'] }))
  }
  const entries = (await Promise.all(promises)).flat()
  return entries.sort((a, b) => b.created_ts.getTime() - a.created_ts.getTime())
}