const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Request extends Model { }
Request.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        origin_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        destination_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },    
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'request',
    }
);
module.exports = Request;