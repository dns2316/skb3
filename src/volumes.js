import notFound from './notFound';
import requestPc from './pc';

export default async function volumes(req, res) {
  try {
    const pc = requestPc()
    const hddVolumes = {}
    console.log(pc); // Promise { <pending> }

    if (pc.hdd) {
      pc.hdd.forEach(({ volume, size }) => {
        if (typeof hddVolumes[volume] === 'undefined') hddVolumes[volume] = 0
        hddVolumes[volume] += size
      })


    Object.keys(hddVolumes).forEach(volume => {
      outSumHddSize = `${volume} | ${hddVolumes[volume]}B`;
      console.log(outSumHddSize);
      res.json(outSumHddSize);
    })
    } else {
      notFound(res);
    }
  }
  catch (e) {
    console.error('Error when get volumes', e, e.stack)
  }
}
