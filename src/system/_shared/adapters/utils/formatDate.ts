const regexp = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/;

export function formatDate(date: string) {
  if (date === null) return null;
  const match = date.match(regexp);
  return `${match[1]} ${match[2]}`;
}
