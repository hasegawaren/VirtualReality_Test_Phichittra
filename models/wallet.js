'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Currency, { foreignKey: 'currencyId' });
      this.hasMany(models.Transfer, { foreignKey: 'sender_wallet_id', as: 'sentTransfers' });
      this.hasMany(models.Transfer, { foreignKey: 'receiver_wallet_id', as: 'receivedTransfers' });
    }
  }
  Wallet.init({
    balance: {
      type: DataTypes.DECIMAL(30, 18),
      allowNull: false,
      defaultValue: 0
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Wallet',
  });

  return Wallet;
};