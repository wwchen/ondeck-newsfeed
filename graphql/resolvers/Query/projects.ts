import db, { ProjectRow } from '../../db'

type Args = {
  id: number;
}

export default async function projects(parent: unknown): Promise<ProjectRow[]> {
  throw new Error(`projects not implemented`)
}