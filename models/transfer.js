'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    static associate(models) {
      this.belongsTo(models.Wallet, { as: 'senderWallet', foreignKey: 'sender_wallet_id' });
      this.belongsTo(models.Wallet, { as: 'receiverWallet', foreignKey: 'receiver_wallet_id' });
    }
  }
  Transfer.init({
    amount: {
      type: DataTypes.DECIMAL(30, 18),
      allowNull: false
    },
    receiver_external_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tx_hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transfer',
  });

  return Transfer;
};