const formidable = require("formidable");
const { Topic, Content, Lesson } = require("../models");
const fs = require("fs");
const db = require("../models");
const csv = require("csv-parser");

const insertDataIntotablesFromCsv = async (req, res) => {
  const responseData = {
    msg: "Error in Adding Lessons ",
    success: false,
    result: "Empty",
  };
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      let oldPath = files.file[0].filepath;
      fs.createReadStream(oldPath)
        .pipe(csv())
        .on("data", async (row) => {
          try {
            const {
              lesson_name,
              lesson_image,
              topic_name,
              icon,
              content_value,
              content_image,
            } = row;
            const transaction = await db.sequelize.transaction();

            try {
              let [lessonInfo] = await Lesson.findOrCreate({
                where: {
                  lesson_name: lesson_name.trim(),
                },
                transaction,
              });
              const newTopic = await Topic.create(
                {
                  lesson_id: lessonInfo.id,
                  topic_name: topic_name,
                  icon: icon,
                  content_value: content_value,
                  content_image: content_image,
                },
                { transaction }
              );
              await transaction.commit();
            } catch (error) {
              console.log("Rolling back data", error);
              await transaction.rollback();
              throw error; // Rethrow the error to be caught by the outer catch block
            }
          } catch (error) {
            console.error("Error processing row:", error);
          }
        })
        .on("end", () => {
          responseData.msg = "Quizes added successfully";
          responseData.success = true;
          responseData.result = "Non-empty";
          res.json(responseData);
        });
    });
  } catch (error) {
    console.log(error);
  }
};
const createLesson = async (req, res) => {
  console.log("CREATE LESSON");
  try {
    const { lesson_name, lesson_image } = req.body;
    console.log({ lesson_name, lesson_image });

    if (
      !lesson_name ||
      !lesson_name.trim() ||
      !lesson_image ||
      !lesson_image.trim()
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Request" });
    }
    const [entry, created] = await Lesson.findOrCreate({
      where: { lesson_name: lesson_name.toLowerCase() },
      defaults: { lesson_image: lesson_image },
    });
    if (created) {
      res
        .status(201)
        .json({
          success: true,
          message: "Lesson created successfully",
          topic: entry,
        });
    } else {
      res
        .status(500)
        .json({ success: false, message: "The Lesson already exists" });
    }
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

const allLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res
      .status(201)
      .json({
        success: true,
        message: "Lessons fetched successfully",
        lessons,
      });
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

module.exports = { createLesson, allLessons, insertDataIntotablesFromCsv };
