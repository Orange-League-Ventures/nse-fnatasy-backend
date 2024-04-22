module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define(
    "quiz",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quizType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return Quiz;
};
