var fs = require("fs");
var csv = require("csv");
var db = require("../models");

let countErr = 0;

var input = fs.createReadStream("./db/csv/Pokemon.csv");
var parser = csv.parse({
  // what to parse by
  delimiter: ",",
  // object literals instead of arrays
  columns: true
});

var transform = csv.transform(function(row) {
  // each row
  const pokemon = {
    pokeId: row.PokeId,
    name: row.Name,
    typeOneId: row.Type1_id,
    typeOne: row.Type1,
    typeTwoId: row.Type2_id,
    typeTwo: row.Type2,
    total: row.Total,
    hp: row.HP,
    attack: row.Attack,
    defense: row.Defense,
    spAtk: row.Sp_Atk,
    spDef: row.Sp_Def,
    speed: row.Speed,
    generation: row.Generation,
    legendary: row.Legendary
  };
  // seeds in each row into the Pokemon model
  db.Pokemon.create(pokemon)
    .then(function() {
      // console.log('Record created')
    })
    .catch(function() {
      countErr++;
      // console.log('Error encountered: ' + err)
    });
});

input.pipe(parser).pipe(transform); // async?
if (countErr > 0) {
  console.log("There is an error or table already exists");
} else {
  console.log("Table created!");
}
