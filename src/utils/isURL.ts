export default function isURL(url: string): boolean {
  const badDelimiter = [',', ' ', ';'];
  const delimiter = url.indexOf('.');

  if (delimiter === -1) return false;
  const includesBadDelimiter = badDelimiter.some(delimiter => url.includes(delimiter));

  if (includesBadDelimiter) return false;
  const [domain, zone] = url.split('.');
  return domain.length > 1 && zone.length > 1;
}
