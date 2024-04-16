module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "explaination",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        explaination_text:{
            type:Sequelize.TEXT,
            allowNull: true,
        },
        image_url:{
            type:Sequelize.STRING,
            allowNull:true,
        }
      },
      {
        timestamps: true,
      }
    );
  
    return User;
  };
  