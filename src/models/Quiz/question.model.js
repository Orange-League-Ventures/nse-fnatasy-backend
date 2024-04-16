module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define(
    "question",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      question_text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sitituation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return Question;
};
