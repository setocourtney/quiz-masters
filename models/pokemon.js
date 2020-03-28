module.exports = function(sequelize, DataTypes) {
  const Pokemon = sequelize.define(
    "Pokemon",
    {
      pokeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      typeOneId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      typeOne: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typeTwoId: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      typeTwo: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      total: {
        type: DataTypes.INTEGER
      },
      hp: {
        type: DataTypes.INTEGER
      },
      attack: {
        type: DataTypes.INTEGER
      },
      defense: {
        type: DataTypes.INTEGER
      },
      spAtk: {
        type: DataTypes.INTEGER
      },
      spDef: {
        type: DataTypes.INTEGER
      },
      speed: {
        type: DataTypes.INTEGER
      },
      generation: {
        type: DataTypes.INTEGER
      },
      legendary: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      freezeTableName: true
    }
  );
  return Pokemon;
};
