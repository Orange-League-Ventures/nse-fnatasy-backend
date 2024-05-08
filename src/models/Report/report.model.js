module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define(
    "report",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      result: {
        type: Sequelize.STRING,
      },
      no_of_attempted: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      date: {
        type:Sequelize.DATE,
        allowNull: false,
      }
    },
    {
      timestamps: true,
    }
  );
  return Report;
};
