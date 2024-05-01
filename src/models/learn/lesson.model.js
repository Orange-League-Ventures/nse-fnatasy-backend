module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define(
      "lesson",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        lesson_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lesson_image: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return Lesson;
  };
  