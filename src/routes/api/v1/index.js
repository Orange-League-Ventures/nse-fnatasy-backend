const express = require("express");
const router = express.Router();

const  userRoutes  = require('./user.routes');
router.use('/user' , userRoutes );

const  topicRoutes  = require('./topic.routes');
router.use('/topic' , topicRoutes );

const  contentRoutes  = require('./content.routes');
router.use('/content' , contentRoutes );

module.exports = router;
