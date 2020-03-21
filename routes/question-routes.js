var db = require("../models");

module.exports = function(app) {

  app.get("/api/questions/:type_id", function(req, res) {
    db.Questions.findAll({
      where: {
        type_id: req.params.type_id
      }
    }).then((dbQuestions) => {
      res.json(dbQuestions);
    });
  });

  app.get("/api/questions/", function(req, res) {
    db.Questions.findAll({}).then((dbQuestions) => {
      res.json(dbQuestions);
    });
  });

  app.get("/api/pokemon_data", function(req, res) {
    db.Pokemon.findAll().then((pokemon) => {
      res.json(pokemon);
    });
  });
};
