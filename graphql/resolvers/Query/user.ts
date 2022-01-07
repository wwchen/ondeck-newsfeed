import db, { UserRow } from '../../db'

type GetArgs = {
  id: number;
}

export default async function user(parent: unknown, { id }: GetArgs): Promise<UserRow> {
  const user: UserRow | undefined = await db.getOne(
    'SELECT * FROM users WHERE id = ?',
    [id]
  )
  if (!user) {
    throw new Error(`User ${id} not found`)
  }
  user.created_ts = new Date(user.created_ts)
  user.updated_ts = new Date(user.updated_ts)
  return user
}
