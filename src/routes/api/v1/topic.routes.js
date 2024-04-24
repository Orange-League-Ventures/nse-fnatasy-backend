const express = require("express");
const router = express.Router();

const  topicController = require('../../../controllers/topic.controller');
router.post('/' , topicController.createTopic )
router.get('/' , topicController.topicsByLessonId )
router.get('/content' , topicController.contentByTopicId )


module.exports = router;