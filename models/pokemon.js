module.exports = function(sequelize, DataTypes) {
    const Pokemon = sequelize.define("Pokemon", {
        pokeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        typeOne: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        typeTwo: {
            type: DataTypes.STRING
        },
        total: {
            type: DataTypes.INTEGER
        },
        hp: {
            type: DataTypes.INTEGER
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        spAtk: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        spDef: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        generation: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        legendary : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
    return Pokemon;
}