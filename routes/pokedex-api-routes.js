const db = require("../models");
//ensures a clean version of Op is required
const Op = require("sequelize").Op;

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.post("/api/pokedex/", function(req, res) {
    db.Pokedex.create({
      pokeId: req.body.pokeId,
      isCaptured: req.body.isCaptured,
      userId: req.body.userId
    }).then(dbPokedex => {
      res.json(dbPokedex);
    });
  });

  app.get("pokedex/:userId", isAuthenticated, function(req, res) {
    //grab user's caught pokemon id values
    db.Pokedex.findAll({
      attributes: ["pokeId"],
      where: {
        userId: req.params.userId
      }
    }).then(results => {
      // get list of pokeIds from Pokedex object
      const pokeIdArray = results.map(pokemon => {
        return { pokeId: pokemon.pokeId };
      });
      // grabs pokemon stats from pokemon database from user's caught pokemon json
      db.Pokemon.findAll({
        where: {
          [Op.or]: pokeIdArray
        }
      }).then(pokemon => {
        res.render("pokedex", { pokemon: pokemon });
      });
    });
  });
};
