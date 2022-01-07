import db, { ProjectRow } from '../../db'

type Args = {
  id: number;
}

export default async function project(parent: unknown, { id }: Args): Promise<ProjectRow> {
  const project: ProjectRow | undefined = await db.getOne(
    'SELECT * FROM projects WHERE id = ?',
    [id]
  )
  if (!project) {
    throw new Error(`Project ${id} not found`)
  }
  project.created_ts = new Date(project.created_ts)
  project.updated_ts = new Date(project.updated_ts)
  return project
}