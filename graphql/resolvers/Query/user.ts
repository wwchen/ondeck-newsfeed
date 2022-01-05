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
  return user
}
