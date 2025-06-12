const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/', tradeController.createTrade);
router.get('/:id', tradeController.getTradeById);
router.patch('/:id', tradeController.updateTradeStatus);

module.exports = router;