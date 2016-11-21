export default function notFound(res, text='Not Found', code=404) {
  const result = res.send(text, code);
  return result;
};
