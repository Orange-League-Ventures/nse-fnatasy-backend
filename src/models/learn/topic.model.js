module.exports = (sequelize, Sequelize) => {
  const Topic = sequelize.define(
    "topic",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      topic_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      content_value: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      content_image: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: true,
    }
  );

  return Topic;
};
