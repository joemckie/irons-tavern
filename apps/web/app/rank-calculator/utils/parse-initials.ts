export function parseInitials(entityName: string) {
  return entityName.split(' ').map(([initial]) => initial);
}
