modules.exports = (sequelize, DataTypes) => {
    const Pokemon = sequelize.define("Pokemon", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeOne: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        typeTwo: {
            type: DataTypes.STRING
        },
        total: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        hp: {
            type: DataTypes.NUMBER
        },
        attack: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        defense: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        spAtk: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        speed: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        generation: {
            type: DataTypes.NUMBER,
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