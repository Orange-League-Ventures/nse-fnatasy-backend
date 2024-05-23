const { Transaction, Portfolio, Stock, User } = require("../../models");

exports.buyStock = async (req, res) => {
  const {
    userId,
    stock_symbol,
    quantity,
    stock_name,
    current_price,
  } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let stock = await Stock.findOne({ where: { stock_symbol } });
    if (!stock) {
      stock = await Stock.create({ stock_symbol, stock_name, current_price });
    } else {
      // await Stock.update({
      //   where: { stock_symbol },
      //   current_price: current_price,
      // });
      await Stock.update(
        { current_price: current_price },
        { where: { stock_symbol: stock_symbol } }
      );
    }
    // if (!stock) return res.status(404).json({ error: "Stock not found" });

    const price = stock.current_price;
    const totalCost = price * quantity;
    console.log(stock,'stocksddsdsdfd');
    const transaction = await Transaction.create({
      user_id: user.id,
      stock_id: stock.dataValues.id,
      type: "BUY",
      quantity,
      price,
    });

    let portfolio = await Portfolio.findOne({
      where: { user_id: user.id, stock_id: stock.dataValues.id },
    });

    if (!portfolio) {
      portfolio = await Portfolio.create({
        user_id: user.id,
        stock_id: stock.dataValues.id,
        quantity,
        averagePrice: price,
      });
    } else {
      const newQuantity = parseInt(portfolio.quantity) + parseInt(quantity);
      portfolio.averagePrice =
        (parseInt(portfolio.averagePrice) * parseInt(portfolio.quantity) +
          parseInt(totalCost)) /
        newQuantity;
      portfolio.quantity = newQuantity;
      await portfolio.save();
    }

    res.status(200).json({ message: "Stock bought successfully", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sellStock = async (req, res) => {
  const { userId, stock_symbol, quantity } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const stock = await Stock.findOne({ where: { stock_symbol } });
    if (!stock) return res.status(404).json({ error: "Stock not found" });

    const portfolio = await Portfolio.findOne({
      where: { user_id: user.id, stock_id: stock.id },
    });
    if (!portfolio || parseInt(portfolio.quantity) < quantity) {
      return res
        .status(400)
        .json({ error: "Not enough stocks in portfolio to sell" });
    }

    const price = stock.current_price;
    const transaction = await Transaction.create({
      user_id: user.id,
      stock_id: stock.id,
      type: "SELL",
      quantity,
      price,
    });

    portfolio.quantity -= quantity;
    if (parseInt(portfolio.quantity) === 0) {
      await portfolio.destroy();
    } else {
      await portfolio.save();
    }

    res.status(200).json({ message: "Stock sold successfully", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserTransactions = async (req, res) => {
  const { userId } = req.query;

  try {
    const transactions = await Transaction.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Stock,
          as: "Stock",
          attributes: ["stock_symbol", "stock_name"],
        },
      ],
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTopPerformers = async (req, res) => {};
