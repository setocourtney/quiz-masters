module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("start");
  });

  app.get("/pokedex", function(req, res) {
    res.render("pokedex");
  });
  
};
