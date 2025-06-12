const { Trade, Advertisement, User } = require('../../models');

exports.createTrade = async (req, res) => {
  const { adId, amount } = req.body;
  const buyerId = 2;

  try {
    const ad = await Advertisement.findOne({ where: { id: adId, status: 'ACTIVE' } });

    if (!ad) {
      return res.status(404).json({ message: "Advertisement not found or is not active." });
    }
    if (ad.userId === buyerId) {
      return res.status(400).json({ message: "You cannot trade with yourself." });
    }
    if (parseFloat(amount) > parseFloat(ad.total_amount)) {
        return res.status(400).json({ message: "Trade amount exceeds available amount." });
    }

    const newTrade = await Trade.create({
      adId: ad.id,
      buyerId: buyerId,
      sellerId: ad.userId,
      amount: amount,
      total_price: parseFloat(amount) * parseFloat(ad.price),
      status: 'PENDING_PAYMENT'
    });

    res.status(201).json(newTrade);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trade', error: error.message });
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const trade = await Trade.findByPk(tradeId, {
      include: [
        { model: Advertisement },
        { model: User, as: 'buyer', attributes: ['id', 'username'] },
        { model: User, as: 'seller', attributes: ['id', 'username'] }
      ]
    });

    if (!trade) {
      return res.status(404).json({ message: "Trade not found." });
    }

    res.status(200).json(trade);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trade details', error: error.message });
  }
};

exports.updateTradeStatus = async (req, res) => {
    try {
        const tradeId = req.params.id;
        const { status } = req.body;

        const trade = await Trade.findByPk(tradeId);

        if (!trade) {
            return res.status(404).json({ message: 'Trade not found.' });
        }

        trade.status = status || trade.status;
        await trade.save();

        res.status(200).json(trade);
    } catch (error) {
        res.status(500).json({ message: 'Error updating trade status', error: error.message });
    }
};