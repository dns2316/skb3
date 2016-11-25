export default function canonize(url) {
  //TODO custom domain name - непонятный коммент из видоса.
  const re = new RegExp('@?(https?:)?(\/\/)?((telegram|vk|vkontakte)[^\/]*\/)?([a-zA-Z0-9]*)', 'i');
  const username = url.match(re)[5];
  return '@' + username;
}
