'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_wallet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Wallets',
          key: 'id'
        }
      },
      receiver_wallet_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Wallets',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.DECIMAL(30, 18),
        allowNull: false
      },
      receiver_external_address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tx_hash: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'FAILED'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transfers');
  }
};