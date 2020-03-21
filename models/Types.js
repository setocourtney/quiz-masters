module.exports = function(sequelize, DataTypes) {
    const Types = sequelize.define("Types", {
      type: DataTypes.STRING,
    });
    return Types;
};