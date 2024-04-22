const express = require("express");
const router = express.Router();

const dictionaryController = require('../../../controllers/dictionary.controller');
router.post('/', dictionaryController.createWord)
router.get('/', dictionaryController.fetcWords)
router.get('/definition', dictionaryController.fetcDefinitionID)
router.get('/search', dictionaryController.searchWords)
router.get('/word-of-the-day', dictionaryController.wordOfTheDay)
router.post('/word-of-the-day', dictionaryController.setWordOfTheDay)

module.exports = router;