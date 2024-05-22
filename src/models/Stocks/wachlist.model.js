module.exports = (sequelize, Sequelize) => {
  const Watchllist = sequelize.define(
    "Watchlist",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      stock_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stock_symbol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_favourite:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: true,
    }
  );

  return Watchllist;
};
