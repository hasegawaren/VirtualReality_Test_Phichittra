'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Currency, { as: 'crypto', foreignKey: 'cryptoCurrencyId' });
      this.belongsTo(models.Currency, { as: 'fiat', foreignKey: 'fiatCurrencyId' });
      this.hasMany(models.Trade, { foreignKey: 'adId' });
    }
  }
  Advertisement.init({
    type: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(30, 18),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'COMPLETED'),
      allowNull: false,
      defaultValue: 'ACTIVE'
    }
  }, {
    sequelize,
    modelName: 'Advertisement',
  });
  
  return Advertisement;
};