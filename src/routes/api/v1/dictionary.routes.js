const express = require("express");
const router = express.Router();

const dictionaryController = require('../../../controllers/dictionary.controller');
router.post('/', dictionaryController.createWord)
router.get('/', dictionaryController.fetcWords)
router.get('/word-defition', dictionaryController.fetcDefinitionID)
router.get('/search', dictionaryController.searchWords)

module.exports = router;