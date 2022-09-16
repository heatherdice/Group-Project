const Member = require("../models/member.model");

module.exports = {
  createMember: (req, res) => {
    Member.create(req.body)
      .then((newMember) => res.json(newMember))
      .catch((err) => res.status(400).json(err));
  },

  getAllMembers: (req, res) => {
    Member.find({})
      .sort({ name: 1 })
      .then((getMembers) => res.json(getMembers))
      .catch((err) => res.status(400).json(err));
  },

  getOneMember: (req, res) => {
    Member.findOne({ _id: req.params.id })
      .then((oneMember) => res.json(oneMember))
      .catch((err) => res.status(400).json(err));
  },

  editMember: (req, res) => {
    Member.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    })
      .then((updatedMember) => res.json(updatedMember))
      .catch((err) => res.status(400).json(err));
  },

  deleteMember: (req, res) => {
    Member.deleteOne({ _id: req.params.id })
      .then((deleteMember) => res.json(deleteMember))
      .catch((err) => res.status(400).json(err));
  },
};
