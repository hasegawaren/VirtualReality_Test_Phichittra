'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {
      this.hasMany(models.Wallet, { foreignKey: 'currencyId' });
      this.hasMany(models.Advertisement, { as: 'cryptoAds', foreignKey: 'cryptoCurrencyId' });
      this.hasMany(models.Advertisement, { as: 'fiatAds', foreignKey: 'fiatCurrencyId' });
    }
  }
  Currency.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('crypto', 'fiat'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Currency',
  });
  
  return Currency;
};