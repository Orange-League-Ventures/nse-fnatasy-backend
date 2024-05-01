const express = require("express");
const router = express.Router();

const  lessonController = require('../../../controllers/lesson.controller');
router.post('/' , lessonController.createLesson )
router.post('/csv',lessonController.insertDataIntotablesFromCsv)
router.get('/' , lessonController.allLessons )

module.exports = router;