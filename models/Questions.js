module.exports = function(sequelize, DataTypes) {
    var Questions = sequelize.define("Questions", {
      daily_double: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
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
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
        freezeTableName: true
    });
      
    return Questions;
};