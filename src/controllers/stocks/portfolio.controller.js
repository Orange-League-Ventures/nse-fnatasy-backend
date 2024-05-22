const { Portfolio, Stock } = require('../../models');

exports.getUserPortfolio = async (req, res) => {
  const { userId } = req.query;
  console.log(userId,'userIdffadfdfdfsdfsd');
  try {
    const portfolio = await Portfolio.findAll({
      where: { user_id:userId},
      include: [
        { model: Stock, as: 'Stock', attributes: ['stock_symbol', 'stock_name', 'current_price'] }
      ]
    });
    console.log(portfolio,'portfolioadasdasd');
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
