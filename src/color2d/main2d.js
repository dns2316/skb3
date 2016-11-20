import canonize from './canonize';

export default async function mongo_practice3(req, res) {
  try {
    const url = req.url;
    res.send (canonize(url));
  } catch (err) {
    console.log('Error in main2d: ', err);
  }
};
