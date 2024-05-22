const express = require("express");
const watchlistController = require("../../../controllers/watchlist.controller");

const router = express.Router();

router.post("/", watchlistController.makeFavouriteStock);
router.get("/", watchlistController.getAllFavouriteStocks);


module.exports = router;
