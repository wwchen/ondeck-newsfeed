import { Context } from "apollo-server-core";
import { GraphQLResolveInfo } from "graphql";

const isDefinedOrEmpty = (value: string) => value || value === ''

export function __resolveType(obj: any, context: Context, info: GraphQLResolveInfo) {
  if (isDefinedOrEmpty(obj.name) && isDefinedOrEmpty(obj.bio)) {
    return 'User'
  }
  if (isDefinedOrEmpty(obj.name) && isDefinedOrEmpty(obj.description)) {
    return 'Project'
  }
  if (isDefinedOrEmpty(obj.title) && isDefinedOrEmpty(obj.body)) {
    return 'Announcement'
  }
  return null
}