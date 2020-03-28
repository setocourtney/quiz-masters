module.exports = function(sequelize, DataTypes) {
  const Pokedex = sequelize.define(
    "Pokedex",
    {
      pokeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isCaptured: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );
  return Pokedex;
};
