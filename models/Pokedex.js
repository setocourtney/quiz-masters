module.exports = function(sequelize, DataTypes) {
    var Pokedex = sequelize.define("Pokedex", {
      pokemon_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isCaptured: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
        freezeTableName: true
    });
      
    return Pokedex;
};