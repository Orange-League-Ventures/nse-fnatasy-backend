const { Stock } = require('../../models');

// Create a new stock
exports.createStock = async (req, res) => {
  const { stock_symbol, name, currentPrice } = req.body;

  try {
    const stock = await Stock.create({ stock_symbol, name, currentPrice });
    res.status(201).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all stocks
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.status(200).json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single stock by ID
exports.getStockById = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a stock
exports.updateStock = async (req, res) => {
  const { id } = req.params;
  const { stock_symbol, name, currentPrice } = req.body;

  try {
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    stock.stock_symbol = stock_symbol !== undefined ? stock_symbol : stock.stock_symbol;
    stock.name = name !== undefined ? name : stock.name;
    stock.currentPrice = currentPrice !== undefined ? currentPrice : stock.currentPrice;

    await stock.save();
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a stock
exports.deleteStock = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    await stock.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
