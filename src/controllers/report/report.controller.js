const db = require("../../models");
const { report, quiz, User } = db;
const moment = require("moment");

const reportController = {};

reportController.updateUserQuizResult = async (req, res) => {
  const { userId, quizId, result, date } = req.body;
  const responseData = {
    msg: "Error in Updating User's Report!",
    success: false,
    result: "Empty",
  };
  const today = moment();
  const utcDate = moment.utc(date);
  const localDate = utcDate.local();
  const formattedDate = localDate.format("YYYY-MM-DD HH:mm:ss.SSS");
  try {
    if (!userId || !quizId) {
      return res
        .status(400)
        .res({ success: false, msg: "User Id and Quiz Id are reqired!" });
    }
    // Check if the user exists
    let userInfo = await User.findOne({ where: { id: userId } });
    if (!userInfo) {
      return res
        .status(401)
        .send({ success: false, msg: "User Does Not Exists!" });
    }

    // Check if the quiz exists
    let quizInfo = await quiz.findOne({ where: { id: quizId } });
    if (!quizInfo) {
      return res
        .status(401)
        .send({ success: false, msg: "Quiz Does Not Exists!" });
    }

    let reportInfo = await report.findOne({
      where: { user_id: userId, quiz_id: quizId, date: formattedDate },
    });
    if (reportInfo) {
      // If report exists, update the existing report with the new result
      const updatedNoOfAttempted = reportInfo.no_of_attempted + 1;

      // If the updated number of attempts is greater than or equal to 3, set it to

      const noOfAttempted =
        updatedNoOfAttempted >= 3 ? 0 : updatedNoOfAttempted;

      await reportInfo.update({
        result: result,
        no_of_attempted: noOfAttempted,
      });
    } else {
      // If no report exists, create a new report for the user and quiz
      await db.report.create({
        user_id: userId,
        quiz_id: quizId,
        result: result,
        no_of_attempted: 1,
        date: formattedDate,
      });
    }

    res
      .status(200)
      .send({ message: "User, quiz, and report updated/created successfully" });
  } catch (error) {
    responseData.error = error;
    console.log(error);
    return res.status(500).send(responseData);
  }
};

reportController.getLastSevenDaysScore = async (req, res) => {
  const responseData = {
    msg: "Error in Updating User's Report!",
    success: false,
    result: "Empty",
  };
  const { quiz_id, date, user_id } = req.query;
  const today = moment();
  const utcDate = moment.utc(date);
  const localDate = utcDate.local();
  const formattedDate = localDate.format("YYYY-MM-DD HH:mm:ss.SSS");
  console.log(date, "dateghhjklj");
  const score = await report.findOne({
    where: { quiz_id: quiz_id, date: formattedDate, user_id: user_id },
  });
  const scoreValue = score ? score.result : null;

  res.status(200).send({ score: scoreValue });
};

module.exports = reportController;
