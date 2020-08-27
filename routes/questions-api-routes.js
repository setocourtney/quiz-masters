const db = require("../models");
//ensures a clean version of Op is required
const Op = require("sequelize").Op;

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
 
  app.get("/api/questions/:typeId", function(req, res) {
    db.Questions.findAll({
      where: {
        typeId: req.params.typeId
      }
    }).then(dbQuestions => {
      res.json(dbQuestions);
    });
  });

  app.get("/api/questions/", function(req, res) {
    db.Questions.findAll({}).then(dbQuestions => {
      res.json(dbQuestions);
    });
  });
};
