module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define(
      "Stock",
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
        current_price: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return Stock;
  };
  