const { Shares } = require("../models");

const insertStockDetails = async (req, res) => {
  try {
    const {
      stock_name,
      stock_symbol,
      buying_price,
      selling_price,
      no_of_shares,
      user_id,
    } = req.body;
    console.log(req.body, "reqbodyeaaaaee");
    const existingStock = await Shares.findOne({ where: { stock_symbol,user_id } }); // const dataInserted = await Share
    if (existingStock) {
      // If the stock_symbol exists, update the no_of_shares
      const existingShares = parseInt(existingStock.no_of_shares);
      const existingBuyingPrice = parseInt(existingStock.buying_price);
      const newBuyingPrice = parseInt(buying_price);

      // Parse no_of_shares to ensure it's treated as a number
      const newShares = parseInt(no_of_shares);

      // Calculate updatedShares as a number
      const updatedShares = existingShares + newShares;

      const updatedBuyingPrice=((existingBuyingPrice*existingShares)+(newBuyingPrice*newShares))/updatedShares

      // Update the existing entry with the new no_of_shares  buying_price
      const updated = await Shares.update(
        { no_of_shares: updatedShares,buying_price:updatedBuyingPrice },
        { where: { stock_symbol } } // Specify the where clause
      );

      console.log("Shares updated successfully.");
      res.status(201).json({
        success: true,
        message: "Stock updated successfully",
        data: updated,
      });
    } else {
      // If the stock_symbol doesn't exist, insert a new entry
      const dataInserted = await Shares.create({
        stock_name,
        stock_symbol,
        buying_price,
        selling_price,
        no_of_shares,
        user_id,
      });
      res.status(201).json({
        success: true,
        message: "Stock Details inserted successfully",
        data: dataInserted,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateSharesAfterSelling = async (req, res) => {
  try {
    const {
      stock_symbol,
      selling_price,
      no_of_shares_selled,
      user_id,
    } = req.body;
    console.log(req.body, "reqbodyeaaaaee");
    const existingStock = await Shares.findOne({ where: { stock_symbol,user_id } }); // const dataInserted = await Share
    if (existingStock) {
      // If the stock_symbol exists, update the no_of_shares
      const existingShares = parseInt(existingStock.no_of_shares);

      // Parse no_of_shares to ensure it's treated as a number
      const sharesSelled = parseInt(no_of_shares_selled);

      // Calculate updatedShares as a number
      const updatedShares = existingShares - sharesSelled;

      // Update the existing entry with the new no_of_shares
      const updated = await Shares.update(
        { no_of_shares: updatedShares,selling_price:selling_price },
        { where: { stock_symbol } } // Specify the where clause
      );
      res.status(201).json({
        success: true,
        message: "Stock updated successfully",
        data: updated,
      });
    } 
  } catch (error) {
    console.log(error);
  }
};

const getStockDetails=async(req,res)=>{
  try{
    const{stock_symbol,user_id}=req.query
    const stockDetails= await Shares.findOne({ where: { stock_symbol ,user_id} })
    res.status(201).json({
      success: true,
      message: "Stock Details inserted successfully",
      data: stockDetails,
    });
  }catch(error){
    console.log(error);
  }
}
module.exports = { insertStockDetails ,getStockDetails,updateSharesAfterSelling};
