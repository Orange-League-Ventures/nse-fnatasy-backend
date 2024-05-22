const express = require("express");
const stockController = require("../../../controllers/stocks.controller");

const router = express.Router();

router.post("/", stockController.insertStockDetails);
router.get("/", stockController.getStockDetails);
router.post("/update-shares-after-selling", stockController.updateSharesAfterSelling);

module.exports = router;
