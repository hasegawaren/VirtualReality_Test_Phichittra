const { Advertisement, User, Currency } = require('../../models');

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Advertisement.findAll({
      where: { status: 'ACTIVE' },
      include: [
        { model: User, attributes: ['username'] },
        { model: Currency, as: 'crypto', attributes: ['code'] },
        { model: Currency, as: 'fiat', attributes: ['code'] },
      ]
    });
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advertisements', error: error.message });
  }
};

exports.createAd = async (req, res) => {
  const { type, cryptoCurrencyId, fiatCurrencyId, price, total_amount } = req.body;
  const userId = 1;

  try {
    const newAd = await Advertisement.create({
      userId,
      type,
      cryptoCurrencyId,
      fiatCurrencyId,
      price,
      total_amount,
      status: 'ACTIVE'
    });
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({ message: 'Error creating advertisement', error: error.message });
  }
};