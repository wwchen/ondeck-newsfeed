import db, { ProjectRow } from '../../db'
import { paginatedQuery } from './_querybuilder'

type Args = {
  fellowships: string[];
  limit: number;
  cursor?: Date;
}

export default async function projects(parent: unknown, { fellowships, limit, cursor }: Args): Promise<ProjectRow[]> {
  const query = paginatedQuery(`
    SELECT DISTINCT p.*
    FROM users u
    JOIN user_projects up on up.user_id = u.id
    JOIN projects p ON up.project_id = p.id
  `, fellowships, limit, cursor, 'p.')
  const projects: ProjectRow[] | undefined = await db.getAll(query)
  if (!projects) {
    throw new Error(`projects not found`)
  }
  return projects
}