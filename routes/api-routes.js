const db = require("../models");
//ensures a clean version of Op is required 
const Op = require("sequelize").Op;

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    // ----  POKEQUIZ ROUTES----

    // app.get("/api/pokemon_data/:pokeId", function(req, res) {
    //   db.Pokemon.findAll({
    //     where: {
    //       pokeId: req.params.pokeId
    //     }
    //   }).then((pokemon) => {
    //     res.json(pokemon);
    //   });
    // });
  
    app.get("/api/pokemon_data/:id", function(req, res) {
      db.Pokemon.findOne({
        where: {
          pokeId: req.params.id
        }
      }).then((pokemon) => {
        res.json(pokemon);
      });
    });

  
  app.get('/play', isAuthenticated, function(req, res) {
    // db.Questions.findAll().then((questions) => {
    //   res.render('index', { questions: questions});
    //   res.json(questions);
    // });
    db.Pokemon.findAll().then((pokemon) => {
      // console.log({pokemon: pokemon})
      console.log(pokemon.length)

      res.render('index', { pokemon: pokemon});
    });
  });

  app.get('/play/:id', isAuthenticated, function(req, res) {

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

  app.post("/api/pokedex/", function(req, res) {
    db.Pokedex.create({
      pokeId: req.body.pokeId,
      isCaptured: req.body.isCaptured,
      userId: req.body.userId
    }).then((dbPokedex) => {
      res.json(dbPokedex);
    });
  });

  app.get("/pokedex/:userId", isAuthenticated, function(req, res) {
    console.log(req.params.userId);
    //grab user's caught pokemon id values
    db.Pokedex.findAll({
      attributes: ["pokeId"],
      where: {
        userId: req.params.userId
      }
    }).then((results) => {
      // get list of pokeIds from Pokedex object
      const pokeIdArray = results.map((pokemon) => { return {pokeId: pokemon.pokeId}} );
      // grabs pokemon stats from pokemon database from user's caught pokemon json
      db.Pokemon.findAll({
        where: {
          [Op.or]: pokeIdArray
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

};
