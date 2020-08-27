const db = require("../models");
//ensures a clean version of Op is required
const Op = require("sequelize").Op;

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // ----  POKEQUIZ ROUTES----
  app.get("/api/pokemon/:id", function(req, res) {
    db.Pokemon.findOne({
      where: {
        pokeId: req.params.id
      }
    }).then(pokemon => {
      res.json(pokemon);
    });
  });

  app.get("/play", isAuthenticated, function(req, res) {
    db.Pokemon.findAll().then(pokemon => {
      res.render("index", { pokemon: pokemon });
    });
  });

  app.get("/api/pokemon", function(req, res) {
    db.Pokemon.findAll().then(pokemon => {
      res.json(pokemon);
    });
  });
};
