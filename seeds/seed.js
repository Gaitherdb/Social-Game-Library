const sequelize = require('../config/connection');
const { User, Game, Friend_Tag } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const friendData = require('./Friend_Tag.json')
// const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const game of gameData) {
    await Game.create({
      ...game,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // for (const comment of commentData) {
  //   await Comment.create({
  //     ...comment,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //     post_id: "1"
  //   });
  // }

  const friends = await Friend_Tag.bulkCreate(friendData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();