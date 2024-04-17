const db = require("../../models");
const { quiz, question, option, explaination } = db;
const csv = require("csv-parser");
const fs = require("fs");
const formidable = require("formidable");
const { log } = require("console");
const quizController = {};

quizController.create = async (req, res) => {
  const responseData = {
    msg: "Error in Adding Quizes ",
    success: false,
    result: "Empty",
  };
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(files);
      let oldPath = files.file[0].filepath;
      fs.createReadStream(oldPath)
        .pipe(csv())
        .on("data", async (row) => {
          console.log("Row-->", row);
          try {
            const {
              quiz_type,
              situation,
              question_text,
              option1,
              option2,
              option3,
              explanation1,
              explanation2,
              explanation3,
              question_image,
              explanation_image1,
              explanation_image2,
              explanation_image3,
              correct_option,
            } = row;

            const transaction = await db.sequelize.transaction();

            try {
              // Create or find the quiz associated with the quiz_type
              let [quizInfo] = await quiz.findOrCreate({
                where: { quizType: quiz_type },
                transaction,
              });

              // Create the question
              const newQuestion = await question.create(
                {
                  quiz_id: quizInfo.id,
                  question_text: question_text,
                  situation,
                  image_url: question_image,
                },
                { transaction }
              );

              // Create options and explanations
              const options = [option1, option2, option3];
              const explanations = [
                { text: explanation1, img: explanation_image1 },
                { text: explanation2, img: explanation_image2 },
                { text: explanation3, img: explanation_image3 },
              ];

              for (let i = 0; i < options.length; i++) {
                const newOption = await option.create(
                  {
                    question_id: newQuestion.id,
                    option_text: options[i],
                    is_correct: correct_option == options[i],
                  },
                  { transaction }
                );
                await explaination.create(
                  {
                    option_id: newOption.id,
                    explaination_text: explanations[i].text,
                    image_url: explanations[i].img,
                  },
                  { transaction }
                );
              }
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

    // const filePath = req.file.path;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(responseData);
  }
};

module.exports = quizController;
