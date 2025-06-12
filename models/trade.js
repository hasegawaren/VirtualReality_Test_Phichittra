'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trade extends Model {
    static associate(models) {
      this.belongsTo(models.Advertisement, { foreignKey: 'adId' });
      this.belongsTo(models.User, { as: 'buyer', foreignKey: 'buyerId' });
      this.belongsTo(models.User, { as: 'seller', foreignKey: 'sellerId' });
    }
  }
  Trade.init({
    amount: {
      type: DataTypes.DECIMAL(30, 18),
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING_PAYMENT', 'PAID', 'COMPLETED', 'CANCELLED', 'DISPUTED'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Trade',
  });
  
  return Trade;
};