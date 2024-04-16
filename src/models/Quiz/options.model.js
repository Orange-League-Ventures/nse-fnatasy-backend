module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "option",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        option_text:{
            type:Sequelize.TEXT,
            allowNull: false,
        },
        is_correct:{
          type:Sequelize.BOOLEAN,
            allowNull:false,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return User;
  };
  