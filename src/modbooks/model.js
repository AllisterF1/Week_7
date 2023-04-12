// Book:
//     _id: string
//     title: string
//     author: string
//     genre: string

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
