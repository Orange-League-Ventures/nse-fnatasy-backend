const { Op } = require("sequelize");

const { Dictionary, sequelize } = require("../models");

const createWord = async (req, res) => {
  try {
    const { word, definition } = req.body;
    const [entry, created] = await Dictionary.findOrCreate({
      where: { word: word.toLowerCase() },
      defaults: { definition: definition },
    });

    if (created) {
      res.status(201).json({
        success: true,
        message: "Word created successfully",
        word: entry,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "The word already exists" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

const fetcWords = async (req, res) => {
  try {
    // const result = [];
    let { query } = req.query;
    const whereClause = query
      ? {
          word: {
            [Op.like]: `%${query}%`,
          },
        }
      : {};
    const entries = await Dictionary.findAll({
      attributes: [
        "id", // Include the ID attribute
        "word",
        [sequelize.fn("SUBSTR", sequelize.col("word"), 1, 1), "first_letter"],
        "definition",
        // Extract the first letter of the word,
      ],
      where: whereClause,
      order: [["word", "ASC"]], // Order by word in ascending order
    });

    res.status(201).json({
      success: true,
      message: "Words fetched successfully",
      wordsByLetter: entries,
    });
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

const fetcDefinitionID = async (req, res) => {
  const { id } = req.query; // Assuming the ID is passed as a URL parameter
  try {
    const entry = await Dictionary.findByPk(id);
    if (entry) {
      res.status(200).json({
        success: true,
        message: "Definition fetched successfully",
        definition: entry.definition,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Definition with ID ${id} not found`,
      });
    }
  } catch (error) {
    console.error("Error finding definition:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

const searchWords = async (req, res) => {
  const { term } = req.query; // Assuming the search term is passed as a query parameter
  try {
    const entries = await Dictionary.findAll({
      where: {
        word: {
          [Op.like]: `%${term}%`, // Use sequelize.Op.like to perform a case-insensitive search
        },
      },
      order: [["word", "ASC"]], // Order by word in ascending order
    });

    if (entries.length > 0) {
      const words = entries.map((entry) => entry.word);
      res
        .status(200)
        .json({ success: true, message: "Words found successfully", words });
    } else {
      res.status(404).json({
        success: false,
        message: "No words found matching the search term",
      });
    }
  } catch (error) {
    console.error("Error searching words:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

const wordOfTheDay = async (req, res) => {
  try {
    // Find the word where wordOfTheDay is true
    const wordOfTheDay = await Dictionary.findOne({
      where: { wordOfTheDay: true },
    });

    if (!wordOfTheDay) {
      res
        .status(500)
        .json({ success: false, message: "No word of the day found", error });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Success",
      wordOfTheDay: {
        word: wordOfTheDay.word,
        definition: wordOfTheDay.definition,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

const setWordOfTheDay = async (req, res) => {
  try {
    // Find the word with the given ID
    const { wordId } = req.query;
    const selectedWord = await Dictionary.findByPk(wordId);

    if (!selectedWord) {
      console.log("Word not found.");
      return;
    }

    // Update the wordOfTheDay field for the selected word to true
    await Dictionary.update({ wordOfTheDay: true }, { where: { id: wordId } });

    // Reset the wordOfTheDay field for all other words to false
    await Dictionary.update(
      { wordOfTheDay: false },
      { where: { id: { [Op.not]: wordId } } }
    );

    res.status(200).json({
      success: true,
      message: "Word of the day set successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  createWord,
  fetcWords,
  searchWords,
  fetcDefinitionID,
  wordOfTheDay,
  setWordOfTheDay,
};
