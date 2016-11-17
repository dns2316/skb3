export default function notFound(res) {
  const result = res.send('Not Found', 404);
  return result;
};
