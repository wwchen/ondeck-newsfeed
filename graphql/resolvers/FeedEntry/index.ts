export function __resolveType(obj, context, info) {
  if (obj.name && obj.avatar_url) {
    return 'User'
  }
  if (obj.name && obj.description) {
    return 'Project'
  }
  return 'Announcement'
}