// Requiring necessary npm packages
var express = require("express");
<<<<<<< HEAD
// var session = require("express-session");
// Requiring passport as we've configured it
// var passport = require("./config/passport");
=======
var session = require("express-session");
>>>>>>> quiz-feature

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;


var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
<<<<<<< HEAD
// We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
=======
>>>>>>> quiz-feature

// Requiring our routes
require("./routes/question-routes.js")(app);
require("./db/import-questions.js");

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    // temporary fix, will create duplicate values each time the server is run 
    require("./db/parse.js");
    // text for checking merge success"
    console.log("This is a git merge attempt placeholder");
  });
});

