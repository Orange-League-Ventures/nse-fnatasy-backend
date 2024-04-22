const db = require("../../models");
const { question, option, explaination } = db;

const questionController = {};

questionController.getQuestionsByQuizId = async (req, res) => {
  const { quizId } = req.query;

  const responseData = {
    msg: "Error in getting Questions",
    success: false,
    result: "Empty",
  };
  // let setIds = 0;

  try {
    if (!quizId) {
      return res
        .status(400)
        .send({ success: false, msg: "Quiz Id is required" });
    }
    const reportData = await db.report.findOne({
      where: { quiz_id: quizId },
      attributes: ["no_of_attempted"],
    });
    // if (!reportData || reportData.no_of_no_of_attempted == 0) {
    //   setIds = 1;
    // } else {
    //   setIds = reportData.no_of_no_of_attempted;
    // }
    const setIds = reportData ? reportData.no_of_attempted : 1;

    const questionData = await question.findAll({
      where: { quiz_id: quizId, set_id: setIds },
      attributes: ["question_text", "sitituation", "image_url", "set_id"],
      include: [
        {
          model: option,
          as: "option",
          attributes: ["option_text", "is_correct"],
          include: {
            model: explaination,
            as: "explaination",
            attributes: ["explaination_text", "image_url"],
          },
        },
      ],
    });
    if (questionData) {
      return res.status(200).json({ success: true, questions: questionData });
    } else {
      return res.status(400).send({ success: false, msg: "Bad Request" });
    }
  } catch (error) {
    responseData.error = error;
    console.log(error);
    return res.status(500).send(responseData);
  }
};

module.exports = questionController;
