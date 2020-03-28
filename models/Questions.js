module.exports = function(sequelize, DataTypes) {
  const Questions = sequelize.define(
    "Questions",
    {
      dailyDouble: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      question: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );
  return Questions;
};
