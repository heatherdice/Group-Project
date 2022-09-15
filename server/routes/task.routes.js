const TaskController = require('../controllers/task.controller');

module.exports = (app) => {
  app.get('/api/tasks', TaskController.getAllTasks);
  app.post('/api/tasks', TaskController.createTask);
  app.get('/api/tasks/:id',TaskController.getOneTask );
  app.put('/api/tasks/:id', TaskController.editTask);
  app.delete('/api/tasks/:id', TaskController.deleteTask);
};