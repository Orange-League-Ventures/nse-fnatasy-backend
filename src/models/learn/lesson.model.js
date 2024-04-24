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
        lessong_image: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return Lesson;
  };
  