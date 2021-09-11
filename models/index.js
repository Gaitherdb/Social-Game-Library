const User = require('./User');
const Game = require('./Game');
const Friend_Tag = require('./Friend_Tag')

User.belongsToMany(User, {
    through: {
        model: Friend_Tag,
        unique: false,
    },
    foreignKey: 'owner_id',
    onDelete: 'CASCADE',
    as: 'u1',
});


User.belongsToMany(User, {
    through : {
        model: Friend_Tag,
        unique: false,
    },
    foreignKey: 'friend_id',
    onDelete: 'CASCADE',
    as: 'u2',
})

User.hasMany(Game, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Game.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Game, Friend_Tag };
