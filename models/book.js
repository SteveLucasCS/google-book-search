const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn10: { type: String, required: true},
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  saved: { type: String, requied: false, default: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
