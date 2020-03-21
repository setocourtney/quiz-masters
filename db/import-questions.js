var fs = require('fs');
var csv = require('csv');
var db = require("../models");

var input = fs.createReadStream('./db/csv/questions.csv');
var parser = csv.parse({
    delimiter: ',',
    columns: true
})

var transform = csv.transform(function(row) {
    var resultObj = {
        "daily_double": row['daily_double'],
        "category": row['category'],
        "question": row['question'],
        "answer": row['answer'],
        "type_id": row['type_id']
    }
    db.Questions.create(resultObj)
        .then(function() {
            console.log('Record created')
        })
        .catch(function(err) {
            console.log('Error encountered: ' + err)
        })
})

input.pipe(parser).pipe(transform);