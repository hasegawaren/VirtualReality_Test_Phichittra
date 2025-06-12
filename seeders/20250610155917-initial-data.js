'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Currencies', [
      { id: 1, code: 'THB', name: 'Thai Baht', type: 'fiat', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, code: 'USD', name: 'US Dollar', type: 'fiat', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, code: 'BTC', name: 'Bitcoin', type: 'crypto', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, code: 'ETH', name: 'Ethereum', type: 'crypto', createdAt: new Date(), updatedAt: new Date() },
    ], {});

    const hashedPassword = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('Users', [
      { id: 1, username: 'seller_a', email: 'seller@test.com', password_hash: hashedPassword, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, username: 'buyer_b', email: 'buyer@test.com', password_hash: hashedPassword, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('Wallets', [
      { userId: 1, currencyId: 1, balance: 10000.00, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, currencyId: 3, balance: 1.5, address: 'btc_address_seller_a', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, currencyId: 4, balance: 10.0, address: 'eth_address_seller_a', createdAt: new Date(), updatedAt: new Date() },

      { userId: 2, currencyId: 1, balance: 500000.00, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, currencyId: 3, balance: 0.1, address: 'btc_address_buyer_b', createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('Advertisements', [{
      userId: 1,
      type: 'SELL',
      cryptoCurrencyId: 3,
      fiatCurrencyId: 1,
      price: 950000.00,
      total_amount: 0.5,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Advertisements', null, {});
    await queryInterface.bulkDelete('Wallets', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Currencies', null, {});
  }
};