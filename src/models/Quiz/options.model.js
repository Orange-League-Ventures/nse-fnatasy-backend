module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define(
    "option",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      option_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Option;
};
