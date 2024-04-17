module.exports = (sequelize, Sequelize) => {
  const Content = sequelize.define(
    "content",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      content_value: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      content_image: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    },
    {
      timestamps: true,
    }
  );

  return Content;
};
