import Ball from './balls';
import User from './user';
import Promise from 'bluebird';

export default async function saveDataInDb(data) {
  try {
    const user = new User(data.user);
    await user.save();
    const promises = data.balls.map((balls) => {
      const ballData = Object.assign({}, balls, {
        owner: user._id, //eslint disable line?!
      });
      return (new Ball(ballData)).save();
    });
    console.log('saveDataInDb was saved');;
    return {
      user,
      balls: await Promise.all(promises),
    };
  } catch (err) {
    console.log('error in saveDataInDb: ', err);
    throw err;
  }
}
