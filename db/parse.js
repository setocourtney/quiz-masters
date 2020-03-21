var fs = require('fs');
var csv = require('csv');
var db = require('../models');

var input = fs.createReadStream('./db/csv/Pokemon.csv');
var parser = csv.parse({
		delimiter: ',',
		columns: true
})

var transform = csv.transform(function(row) {
    const pokemon = {
        number: row['Number'],
        name: row['Name'],
        typeOne: row['Type 1'],
        typeTwo: row['Type 2'],
        total: row['Total'],
        hp: row['HP'],
        attack: row['Attack'],
        defense: row['Defense'],
        spAtk: row['Sp. Atk'],
        spDef: row['Sp. Def'] ,
        speed: row['Speed'],
        generation: row['Generation'],
        legendary: row['Legendary']
    }
    db.Pokemon.create(pokemon)
        .then(function() {
            console.log('Record created')
        })
        .catch(function(err) {
            console.log('Error encountered: ' + err)
        })
})

input.pipe(parser).pipe(transform)