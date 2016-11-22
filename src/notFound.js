export default function notFound(res, text='Not Found', code=404) {
  const result = res.status(code).send(text);
  return result;
};
