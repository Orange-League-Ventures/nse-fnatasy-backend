module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "question",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        question_text:{
            type:Sequelize.TEXT,
            allowNull: false,
        },
        situation:{
          type:Sequelize.TEXT,
          allowNull:false,
        },
        c:{
          type:Sequelize.STRING,
          allowNull:true,
        },
        // time:{
        //     type:Sequelize.INTEGER,
        //     allowNull:false,
        // }
      },
      {
        timestamps: true,
      }
    );
  
    return User;
  };
  