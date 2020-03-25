// Requiring necessary npm packages
var express = require("express");

var session = require("express-session");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Requiring our routes
require("./routes/question-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/question-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {

    // Import csv data after sequelize tables have been initialized
    require("./db/import-questions.js");
<<<<<<< HEAD
=======
    // require("./db/import-pokemon-type.js");
>>>>>>> 7de0240f7015ad41c76abeef233477d3ed933661
    require("./db/import-pokemon.js");

    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);

  });
});

