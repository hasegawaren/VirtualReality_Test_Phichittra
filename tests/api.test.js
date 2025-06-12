const request = require('supertest');
const { app, server } = require('../app');
const { sequelize } = require('../models');

describe('API Endpoints', () => {

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
    server.close();
  });


  describe('GET /api/advertisements', () => {
    it('should return 200 OK and a list of advertisements', async () => {
      const response = await request(app).get('/api/advertisements');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/trades', () => {
    it('should return 201 Created when creating a valid trade', async () => {
      const newTradeData = {
        adId: 1,
        amount: "0.01"
      };

      const response = await request(app)
        .post('/api/trades')
        .send(newTradeData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.status).toBe('PENDING_PAYMENT');
    });
  });

});