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
    },
    {
      timestamps: true,
    }
  );
  return Report;
};
