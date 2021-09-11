const sequelize = require('../config/connection');
const { User, Game, Ownership, Friendship } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const ownershipData = require('./ownershipData.json');
const friendshipData = require('./friendshipData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const games = await Game.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });

  const ownership = await Ownership.bulkCreate(ownershipData, {
    individualHooks: true,
    returning: true,
  });

  const friendship = await Friendship.bulkCreate(friendshipData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();