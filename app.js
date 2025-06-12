require('dotenv').config();
const express = require('express');
const adRoutes = require('./src/routes/adRoutes');
const tradeRoutes = require('./src/routes/tradeRoutes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/advertisements', adRoutes);
app.use('/api/trades', tradeRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});