import notFound from './notFound';
import requestPc from './pc';

export default async function volumes(req, res) {
  try {
    const pc = await requestPc();
    const hddVolumes = {}
    console.log(pc); // Promise { <pending> }

    if (pc.hdd) {
      pc.hdd.forEach(({ volume, size }) => {
        if (typeof hddVolumes[volume] === 'undefined') hddVolumes[volume] = 0
        hddVolumes[volume] += size
      })


    Object.keys(hddVolumes).forEach(volume => {
      // const hddVolumes += `${volume} | ${hddVolumes[volume]}B`;
      console.log(`${volume} | ${hddVolumes[volume]}B`);
    });
    res.json(hddVolumes);
    } else {
      notFound(res);
    }
  }
  catch (e) {
    console.error('Error when get volumes', e, e.stack)
  }
}
