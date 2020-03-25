var db = require("../models");
// no path specific
const Op = require("Sequelize").Op;
// const Op = db.Sequelize.Op;
module.exports = function(app) {

  app.get('/play', function(req, res) {
    // db.Questions.findAll().then((questions) => {
    //   res.render('index', { questions: questions});
    //   res.json(questions);
    // });
    db.Pokemon.findAll().then((pokemon) => {
      // console.log({pokemon: pokemon})
      console.log(pokemon.length)

      res.render('index', { pokemon: pokemon });
    });
  });

  app.get('/play/:id', function(req, res) {

    db.Pokemon.findOne({
      where: {
        pokeId: req.params.id
      },
      include: [db.Types]
    }).then((pokemon) => {
      db.Questions.findAll({
        where: {
          type_id: pokemon.type
        }
      }).then(questions)
      res.render("battle", { pokemon: pokemon[0] })

    });
  });

  app.get("/pokedex/:user_id", function(req, res) {
    //grab user's caught pokemon id values
    db.Pokedex.findAll({
      // need to change pokemon_id to match pokeId in Pokemon.js 
      attributes: "pokemon_id",
      where: {
        user_id: req.params.user_id
      }
    }).then((pokemonId) => {
      //grabs pokemon stats from pokemon database from user's caught pokemon json
      db.Pokemon.findAll({
        where: {
          [Op.or]: pokemonId
        }
      }).then((pokemon) => {
        res.render("pokedex", { pokemon: pokemon });
      });
    });
  });


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

  app.get("/api/pokemon_data/:id", function(req, res) {
    db.Pokemon.findAll({
      where: {
        pokeId: req.params.id
      }
    }).then((pokemon) => {
      res.json(pokemon);
    });
  });
};
