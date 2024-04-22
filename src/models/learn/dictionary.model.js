module.exports = (sequelize, Sequelize) => {
    const Dictionary = sequelize.define(
      "dictionary",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        word: {
          type: Sequelize.STRING,
          allowNull: false
        },
        definition: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        wordOfTheDay:{
          type: Sequelize.BOOLEAN,
          allowNull: true
        }
      },
      {
        timestamps: true,
      }
    );
  
    return Dictionary;
  };
  