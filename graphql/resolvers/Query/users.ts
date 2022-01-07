import db, { UserRow } from '../../db'
import { paginatedQuery } from './_querybuilder'

type Args = {
  fellowships: string[]
  limit: number;
  cursor?: Date;
}

export default async function users(parent: unknown, { fellowships, limit, cursor }: Args): Promise<UserRow[]> {
  const query = paginatedQuery('SELECT * FROM users', fellowships, limit, cursor)

  const users: UserRow[] | undefined = await db.getAll(query)
  if (!users) {
    throw new Error(`Users not found`)
  }
  return users
}