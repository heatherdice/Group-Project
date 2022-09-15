const HomeController = require('../controllers/home.controller');
module.exports = (app) => {
  app.get('/api', HomeController.home)
}