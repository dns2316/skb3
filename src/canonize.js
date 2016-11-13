export default function canonize(url) {
  //TODO custom domain name - непонятный коммент из видоса.
  const re = new RegExp('^([a-z]+:\/\/)?(\w*)(.[a-z]*)?(\/)*(\w*)*', 'i');
  const result = url.match(re);
  return result;
}
