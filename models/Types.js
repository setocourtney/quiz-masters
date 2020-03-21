module.exports = function(sequelize, DataTypes) {
    const Types = sequelize.define("Types", {
      type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    });

    Types.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Types.hasMany(models.Questions, {
        onUpdate: "cascade"
      });
    };

    Types.bulkCreate(
      {type: "Fire"},
      {type: "Water"},
      {type: "Grass"},
      {type: "Electric"},
      {type: "Psychic"},
      {type: "Steel"},
      {type: "Normal"},
      {type: "Fairy"},
      {type: "Dark"},
      {type: "Flying"},
      {type: "Ghost"},
      {type: "Poison"},
      {type: "Ice"},
      {type: "Ground"},
      {type: "Rock"},
      {type: "Dragon"},
      {type: "Fighting"},
      {type: "Bug"});

    return Types;
};