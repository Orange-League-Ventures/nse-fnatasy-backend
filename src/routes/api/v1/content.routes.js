const express = require("express");
const router = express.Router();

const  contentController = require('../../../controllers/content.controller');
router.post('/' , contentController.createContent )
router.get('/' , contentController.ContentByTopicID )


module.exports = router;