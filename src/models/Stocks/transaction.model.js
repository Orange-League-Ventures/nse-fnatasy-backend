module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      price:{
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
    }
  );

  return Transaction;
};
