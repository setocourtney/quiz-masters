module.exports = function(sequelize, DataTypes) {
    const Types = sequelize.define("Types", {
      pokemon_type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    }, {
      freezeTableName: true
  });

  return Types;
};