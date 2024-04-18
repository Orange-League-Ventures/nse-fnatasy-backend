const express = require("express");
const router = express.Router();

const quiz = require("./quiz");
const question = require("./question");

router.use("/quiz", quiz);
router.use("/question", question);

module.exports = router;
