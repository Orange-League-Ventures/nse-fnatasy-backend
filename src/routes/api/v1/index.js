const express = require("express");
const router = express.Router();

const quiz = require("./quiz");
const question = require("./question");
const report = require("./report");

router.use("/quiz", quiz);
router.use("/question", question);
router.use("/report", report);

module.exports = router;
