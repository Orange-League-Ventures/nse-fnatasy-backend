const express = require("express");
const quizController = require("../../../controllers/quiz/quiz.controller");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Set your upload directory here
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Keep the original file name
  }
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single('file'), quizController.create);

module.exports = router;
