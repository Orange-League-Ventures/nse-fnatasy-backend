module.exports = (sequelize, Sequelize) => {
    const Shares = sequelize.define(
      "Shares",
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
        buying_price: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        selling_price: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        no_of_shares: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      {
        timestamps: true,
      }
    );
  
    return Shares;
  };
  