const User = require('./User');
const Game = require('./Game');

User.hasMany(User, {
    foreignKey: 'friend_id',
    onDelete: 'CASCADE'
});

User.belongsTo(User, {
    foreignKey: 'friend_id',
})

User.hasMany(Game, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Game.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Game };
