const express = require("express");
const reportController = require("../../../controllers/report/report.controller");

const router = express.Router();

router.post("/", reportController.updateUserQuizResult);

module.exports = router;
