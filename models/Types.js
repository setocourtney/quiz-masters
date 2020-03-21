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

  Types.associate = function(models) {
    Types.hasMany(models.Questions, {
      onUpdate: "cascade"
    });
  };

  return Types;
};