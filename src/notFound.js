export default function notFound(res, text = 'Not Found', code = 404) {
  return res.status(code).send(text);
};
