import saveDataInDb from './saveDataInDb';
import Promise from 'bluebird';

export default function addToBase () {
  const dataConst = {
      user: {
        name: 'dns2316',
      },
      balls: [
        {
          name: 'Geary',
          type: 'football',
        },
        {
          name: 'Luis',
          type: 'basketball',
        },
        {
          name: 'Poll',
          type: 'volleyball',
        },
      ],
    };
saveDataInDb(dataConst);
}
