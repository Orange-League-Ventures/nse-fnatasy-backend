const express = require("express");
const router = express.Router();

const  userRoutes  = require('./user.routes');
router.use('/user' , userRoutes );

const  topicRoutes  = require('./topic.routes');
router.use('/topic' , topicRoutes );

const  lessonRoutes  = require('./lesson.routes');
router.use('/lesson' , lessonRoutes );

const  dictionaryRoutes  = require('./dictionary.routes');
router.use('/dictionary' , dictionaryRoutes );
const quiz = require("./quiz");
const question = require("./question");
const report = require("./report");
const shares = require("./shares");
const amount = require("./amount.routes");
const watchlist=require("./watchlist.routes")

const transactionController = require('../../../controllers/stocks/transaction.controller');
const portfolioController = require('../../../controllers/stocks/portfolio.controller');

router.use("/quiz", quiz);
router.use("/question", question);
router.use("/report", report);
router.use("/shares", shares);
router.use("/amount", amount);
router.use("/watchlist", watchlist);


router.post('/buy', transactionController.buyStock);
router.post('/sell', transactionController.sellStock);
router.get('/portfolio', portfolioController.getUserPortfolio);
router.get('/portfolio/stock-data', portfolioController.getStockDetails);
router.get('/transactions', transactionController.getUserTransactions);



module.exports = router;
