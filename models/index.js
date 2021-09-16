const User = require('./User');
const Game = require('./Game');
const Friendship = require('./Friendship')
const Ownership = require('./Ownership')
const Request = require('./Request')

User.belongsToMany(User, {
  through: {
    model: Friendship,
    unique: false,
  },
  onDelete: 'CASCADE',
  as: 'friends',
});

User.belongsToMany(Game, {
  through: {
    model: Ownership,
    unique: false
  },
  as: 'owned_games'
});

module.exports = { User, Game, Friendship, Ownership, Request };
