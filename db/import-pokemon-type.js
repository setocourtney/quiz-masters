var fs = require('fs');
var csv = require('csv');
var db = require("../models");

var input = fs.createReadStream('./db/csv/pokemon-type.csv');
var parser = csv.parse({
    delimiter: ',',
    columns: true
})

var transform = csv.transform(function(row) {
    var resultObj = {
        "pokemon_type": row['pokemon_type']
    }
    db.Types.create(resultObj)
        .then(function() {
            console.log('Record created')
        })
        .catch(function(err) {
            console.log('Error encountered: ' + err)
        })
})

input.pipe(parser).pipe(transform);