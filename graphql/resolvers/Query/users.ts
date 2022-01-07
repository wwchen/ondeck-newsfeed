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
  users.map(e => {
    e.created_ts = new Date(e.created_ts)
    e.updated_ts = new Date(e.updated_ts)
  })
  return users
}