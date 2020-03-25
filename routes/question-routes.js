var db = require("../models");

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
  })

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
