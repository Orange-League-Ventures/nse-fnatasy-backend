const { Amount } = require("../models");

const postAmount = async (req, res) => {
  // try {
  //   const { total_amount, user_id } = req.body;
  //   const details = await Amount.create({
  //     total_amount,
  //     user_id,
  //   });
  //   res.status(201).json({
  //     success: true,
  //     message: "Stock updated successfully",
  //     data: details,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const { total_amount, user_id } = req.body;

    // Check if the record already exists
    const existingRecord = await Amount.findOne({ where: { user_id } });

    let details;
    if (existingRecord) {
      // If the record exists, update the total_amount
      const updatedAmount = existingRecord.total_amount + total_amount;
      await existingRecord.update({ total_amount: updatedAmount });
      details = existingRecord;
    } else {
      // If the record doesn't exist, create a new record
      details = await Amount.create({
        total_amount,
        user_id,
      });
    }

    res.status(201).json({
      success: true,
      message: existingRecord
        ? "Stock updated successfully"
        : "Stock created successfully",
      data: details,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the stock amount",
      error: error.message,
    });
  }
};

const getAmountDetails = async (req, res) => {
  try {
    const { user_id } = req.query;
    const details = await Amount.findOne({ where: { user_id } });
    res.status(201).json({
      success: true,
      message: "Stock updated successfully",
      amount: details,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateAmountAfterSelling = async (req, res) => {
  try {
    const { amount, user_id } = req.body;
    const total_amount = await Amount.findOne({
      where: { user_id },
    });
    const details = await Amount.update(
      { total_amount: total_amount.total_amount + parseInt(amount) },
      { where: { user_id } }
    );
    res.status(201).json({
      success: true,
      message: "Stock updated successfully",
      amount: details,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateAmountAfterBuying = async (req, res) => {
  try {
    const { amount, user_id } = req.body;
    const total_amount = await Amount.findOne({
      where: { user_id },
    });
    const details = await Amount.update(
      { total_amount: total_amount.total_amount - parseInt(amount) },
      { where: { user_id } }
    );
    res.status(201).json({
      success: true,
      message: "Stock updated successfully",
      amount: details,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  postAmount,
  getAmountDetails,
  updateAmountAfterSelling,
  updateAmountAfterBuying,
};
