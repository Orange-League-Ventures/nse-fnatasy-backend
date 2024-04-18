const express = require("express");
const questionController = require("../../../controllers/question/question.controller");

const router = express.Router();

router.get("/", questionController.getQuestionsByQuizId);

module.exports = router;
