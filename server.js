// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/passport-api-routes.js")(app);
require("./routes/pokemon-api-routes.js")(app);
require("./routes/pokedex-api-routes.js")(app);
require("./routes/questions-api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    // check if we need to import csv values and not run if it already exists
    // Import csv data after sequelize tables have been initialized

    db.Pokemon.findAll().then(result => {
      if (result.length === 0) {
        require("./db/import-pokemon.js");
      }
    });

    db.Questions.findAll().then(result => {
      if (result.length === 0) {
        require("./db/import-questions.js");
      }
    });

    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
