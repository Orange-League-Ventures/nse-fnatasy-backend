module.exports = (sequelize, Sequelize) => {
    const Amount = sequelize.define(
      "Amount",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        total_amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return Amount;
  };
  