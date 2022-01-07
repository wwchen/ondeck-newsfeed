import db, { ProjectRow } from '../../db'

type Args = {
  fellowships: string[];
}

export default async function projects(parent: unknown, { fellowships }: Args): Promise<ProjectRow[]> {
  let query = `
    SELECT DISTINCT p.*
    FROM users u
    JOIN user_projects up on up.user_id = u.id
    JOIN projects p ON up.project_id = p.id
  `
  if (fellowships) {
    const options = fellowships.map(x => `'${x}'`).join(', ')
    query += ` WHERE u.fellowship IN (${options})`
  }
  const projects: ProjectRow[] | undefined = await db.getAll(query)
  if (!projects) {
    throw new Error(`projects not found`)
  }
  projects.map(e => {
    e.created_ts = new Date(e.created_ts)
    e.updated_ts = new Date(e.updated_ts)
  })
  return projects
}