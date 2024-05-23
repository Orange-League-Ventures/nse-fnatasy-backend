const { log } = require("console");
const { Portfolio, Stock } = require("../../models");

exports.getUserPortfolio = async (req, res) => {
  const { userId } = req.query;
  console.log(userId,'userIdffadfdfdfsdfsd');
  try {
    const portfolio = await Portfolio.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Stock,
          as: "Stock",
          attributes: ["stock_symbol", "stock_name", "current_price"],
        },
      ],
    });
    console.log(portfolio,'portfolioadasdasd');
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getStockDetails = async (req, res) => {
  try {
    const { stock_symbol, user_id } = req.query;
    const stock = await Stock.findOne({
      where: { stock_symbol },
      attributes: ['id'],
    });
    
    if (stock) {
      const stock_id = stock.dataValues.id;
      const stockDetails = await Portfolio.findOne({
        where: { stock_id, user_id },
      });
    
      if (stockDetails) {
        console.log(stockDetails, 'Portfolio Details');
        res.status(201).json({
          success: true,
          message: "Stock Details inserted successfully",
          data: stockDetails,
        });
      } else {
        console.log('No portfolio found for the given stock ID and user ID.');
      }
    } else {
      console.log('No stock found with the given symbol.');
    }
  } catch (error) {
    console.log(error);
  }
};
