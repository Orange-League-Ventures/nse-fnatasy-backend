const express = require("express");
const amountController = require("../../../controllers/amount.controller");

const router = express.Router();

router.post("/", amountController.postAmount);
router.get("/", amountController.getAmountDetails);
router.post("/update", amountController.updateAmountAfterSelling);
router.post("/update-amount-after-buying", amountController.updateAmountAfterBuying);
//updateAmountAfterSelling
module.exports = router;
