const db = require('../models');
const searchByTitle = require('../utils/GoogleAPI.js');

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Book
      .findOne({ isbn10: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByTitle: function (req, res) {
    searchByTitle(req.params.title, (result) => {
      res.send(result);
    });
  },
  create: function (req, res) {
    db.Book.find({ isbn10: req.body.isbn10 }).then((result) => {
      if (result.length===0) {
        db.Book.create(req.body)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
      } else {
        console.log('Already in DB');
      }
    });
  },
  remove: function (req, res) {
    db.Book
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};
