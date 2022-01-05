import db, { UserRow } from '../../db'

type Args = {
  fellowships: string[]
}

export default async function users(parent: unknown, { fellowships }: Args): Promise<UserRow[]> {
  const options = fellowships.map(x => `'${x}'`).join(', ')
  const users: UserRow[] | undefined = await db.getAll(
    `SELECT * FROM users where fellowship IN (${options})`
  )
  if (!users) {
    throw new Error(`Users not found`)
  }
  return users
}