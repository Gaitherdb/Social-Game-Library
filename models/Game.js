const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Game extends Model { }
Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Platform
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Date Added
        date_added: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // Beaten
        beaten: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        // Currently Playing
        currently_playing: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        // Rating
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                len: [1],
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game',
    }
);
module.exports = Game;