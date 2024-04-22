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
        allowNull: true,
      },
      sitituation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      set_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  return Question;
};
