const express = require("express");
const quizController = require("../../../controllers/quiz/quiz.controller");

const router = express.Router();

router.post("/", quizController.create);
router.get("/", quizController.get);

module.exports = router;
