import saveDataInDb from './saveDataInDb';

export default function data () {
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
saveDataInDb(dataConst)
.then(() => {
  // res.send('data was be loaded');
});
}
