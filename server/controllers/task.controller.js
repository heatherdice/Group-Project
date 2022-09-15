const Task = require('../models/task.model');

module.exports = {

  createTask: (req, res) => {
    Task.create(req.body)
    .then((newTask) => res.json(newTask))
    .catch((err) => res.status(400).json(err));
  },

  getAllTasks: (req, res) => {
    Task.find({}).sort({ createdAt: 1 })
    .then((allTasks) => res.json(allTasks))
    .catch((err) => res.status(400).json(err));
  },

  getOneTask: (req, res) => {
    Task.findOne({ _id: req.params.id })
    .then((oneTask) => res.json(oneTask))
    .catch((err) => res.status(400).json(err));
  },

  editTask: (req, res) => {
    Task.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => res.status(400).json(err));
  },

  deleteTask: (req, res) => {
    Task.deleteOne({ _id: req.params.id })
    .then((deletedId) => res.json(deletedId))
    .catch((err) => res.status(400).json(err));
  }

};