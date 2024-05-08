const express = require("express");
const quizController = require("../../../controllers/quiz/quiz.controller");

const router = express.Router();

router.post("/", quizController.create);
router.get("/", quizController.get);
router.get("/getAllIds", quizController.getAllIds);

module.exports = router;
