const { Op } = require('sequelize');

const { Dictionary, sequelize } = require('../models');


const createWord = async (req, res) => {
    try {
        const { word, definition } = req.body;
        const [entry, created] = await Dictionary.findOrCreate({
            where: { word: word.toLowerCase() },
            defaults: { definition: definition }
        });

        if (created) {
            res.status(201).json({ success: true, message: 'Word created successfully', word: entry });
        } else {
            res.status(500).json({ success: false, message: 'The word already exists' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}

const fetcWords = async (req, res) => {
    try {
        const result = []
        const entries = await Dictionary.findAll({
            attributes: [
                'id', // Include the ID attribute
                'word',
                [sequelize.fn('SUBSTR', sequelize.col('word'), 1, 1), 'first_letter'], // Extract the first letter of the word,
            ],
            group: ['id', 'word'],
            order: [['word', 'ASC']] // Order by word in ascending order
        });
        entries.forEach((entry) => {
            const firstLetter = entry.getDataValue('first_letter');
            const word = entry.getDataValue('word');
            const id = entry.getDataValue('id');
            if (!result[firstLetter]) {
                result[firstLetter] = [];
            }
            result[firstLetter].push({ id, word });
        });
        const resultArray = Object.entries(result).map(([letter, words]) => ({ letter, words }));

        res.status(201).json({ success: true, message: 'Words fetched successfully', wordsByLetter: resultArray });

    } catch (error) {
        console.log({ error });
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}

const fetcDefinitionID = async (req, res) => {
    const { id } = req.query; // Assuming the ID is passed as a URL parameter
    try {
        const entry = await Dictionary.findByPk(id);
        if (entry) {
            res.status(200).json({ success: true, message: 'Definition fetched successfully', definition: entry.definition });
        } else {
            res.status(404).json({ success: false, message: `Definition with ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error finding definition:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}

const searchWords = async (req, res) => {
    const { term } = req.query; // Assuming the search term is passed as a query parameter
    try {
        const entries = await Dictionary.findAll({
            where: {
                word: {
                    [Op.like]: `%${term}%` // Use sequelize.Op.like to perform a case-insensitive search
                }
            },
            order: [['word', 'ASC']] // Order by word in ascending order
        });

        if (entries.length > 0) {
            const words = entries.map(entry => entry.word);
            res.status(200).json({ success: true, message: 'Words found successfully', words });
        } else {
            res.status(404).json({ success: false, message: 'No words found matching the search term' });
        }
    } catch (error) {
        console.error('Error searching words:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}

const WordOfTheDay = async (req, res) => {
    try {
        const count = await Dictionary.count();

        const randomIndex = Math.floor(Math.random() * count);

        const entry = await Dictionary.findOne({
            offset: randomIndex
        });

        if (entry) {
            res.status(200).json({
                success: true, message: 'Word of the day fetched successfully', wordOfTheDay: {
                    word: entry.word, definition: entry.definition
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'No words found in the dictionary' });
        }
    } catch (error) {
        console.error('Error fetching word of the day:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}


module.exports = { createWord, fetcWords, searchWords, fetcDefinitionID, WordOfTheDay };
