var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("start");
  });

  app.get("/pokedex/:user_id", function(req, res) {
    // week 13 act 9 
    db.Pokedex.findAll({
      where: {
        user_id: req.params.user_id
      }
    }).then((dbPokedex) => {
      res.render("pokedex");
    });
  });

  app.get("/play", function(req, res) {
    res.render("index");
  });

};
