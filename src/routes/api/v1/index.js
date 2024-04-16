const express = require("express");
const router = express.Router();

const quiz = require("./quiz");

router.use("/quiz", quiz);

module.exports = router;
