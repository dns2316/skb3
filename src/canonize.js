export default function canonize(url) {
  url = url
  .replace(/\s*/, '')
  .replace(/#/, '');
  return url;
}
