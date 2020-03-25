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

  app.get("/api/pokedex/:id", function(req, res) {
    db.Pokedex.findAll({
      where: {
        user_id: req.params.id
      }
    }).then((dbPokedex) => {
      res.json(dbPokedex);
    });
  });

  app.post("/api/pokedex/", function(req, res) {
    db.Pokedex.create({
      pokemon_id: req.body.pokemon_id,
      isCaptured: req.body.isCaptured,
      user_id: req.body.user_id
    }).then((dbPokedex) => {
      res.json(dbPokedex);
    });
  });

  app.get("/api/pokemon_data", function(req, res) {
    db.Pokemon.findAll().then((pokemon) => {
      res.json(pokemon);
    });
  });

  app.get("/api/pokemon_data/:id", function(req, res) {
    db.Pokemon.findOne({
      where: {
        pokeId: req.params.id
      }
    }).then((pokemon) => {
      res.json(pokemon);
    });
  });
};
