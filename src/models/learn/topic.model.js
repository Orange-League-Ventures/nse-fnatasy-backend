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
      chart_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['bar', 'line', 'pie']], // Allowed chart types
        },
      },
    },
    {
      timestamps: true,
    }
  );

  return Topic;
};
