const express = require("express");
const router = express.Router();

const  userRoutes  = require('./user.routes');
router.use('/user' , userRoutes );

const  topicRoutes  = require('./topic.routes');
router.use('/topic' , topicRoutes );

const  lessonRoutes  = require('./lesson.routes');
router.use('/lesson' , lessonRoutes );

const  dictionaryRoutes  = require('./dictionary.routes');
router.use('/dictionary' , dictionaryRoutes );
const quiz = require("./quiz");
const question = require("./question");
const report = require("./report");

router.use("/quiz", quiz);
router.use("/question", question);
router.use("/report", report);

module.exports = router;
