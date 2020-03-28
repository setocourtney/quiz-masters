var fs = require("fs");
var csv = require("csv");
var db = require("../models");
let countErr = 0;
var input = fs.createReadStream("./db/csv/questions.csv");
var parser = csv.parse({
  delimiter: ",",
  columns: true
});

var transform = csv.transform(function(row) {
  var resultObj = {
    dailyDouble: row.daily_double,
    category: row.category,
    question: row.question,
    answer: row.answer,
    typeId: row.type_id
  };
  db.Questions.create(resultObj)
    .then(function() {
      // console.log('Record created')
    })
    .catch(function() {
      countErr++;
      // console.log('Error encountered: ' + err)
    });
});

input.pipe(parser).pipe(transform);
if (countErr > 0) {
  console.log("There is an error or table already exists");
} else {
  console.log("Table created!");
}
