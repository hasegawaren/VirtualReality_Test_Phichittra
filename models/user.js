'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Wallet, { foreignKey: 'userId' });
      this.hasMany(models.Advertisement, { foreignKey: 'userId' });
      this.hasMany(models.Trade, { foreignKey: 'buyerId', as: 'boughtTrades' });
      this.hasMany(models.Trade, { foreignKey: 'sellerId', as: 'soldTrades' });
    }
  }
  User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};