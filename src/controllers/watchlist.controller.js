const { Watchllist } = require("../models");

const makeFavouriteStock = async (req, res) => {
  try {
    const { user_id, stock_name, stock_symbol } = req.body;
    console.log(stock_name, stock_symbol,'ahhvfajjfayfjafa');
    const [addedData, created] = await Watchllist.findOrCreate({
      where: {
        user_id: user_id,
        stock_symbol: stock_symbol,
      },
      defaults: {
        stock_name: stock_name,
        is_favourite: 1,
      },
    });
    if (!created) {
      // Update the is_favourite field
      const data = await Watchllist.findOne({
        where: { user_id: user_id, stock_symbol: stock_symbol },
      });
      const is_favourite = data.is_favourite;
      await addedData.update({ is_favourite: !is_favourite });
    }

    res.status(201).json({
      success: true,
      message: "Added Stock as a Favourite",
      data: addedData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllFavouriteStocks = async (req, res) => {
  try {
    const { user_id } = req.query;
    const favouriteStocks = await Watchllist.findAll({
      where: { user_id },
      attributes:["id","stock_name","stock_symbol","is_favourite"]
    });
    res.status(201).json({
      success: true,
      message: "Added Stock as a Favourite",
      data: favouriteStocks,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { makeFavouriteStock ,getAllFavouriteStocks};
