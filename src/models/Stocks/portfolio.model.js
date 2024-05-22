module.exports = (sequelize, Sequelize) => {
  const Portfolio = sequelize.define(
    "Portfolio",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      averagePrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Portfolio;
};
