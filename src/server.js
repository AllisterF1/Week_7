require("dotenv").config();
require("./db/connection");

const express = require("express");

const Book = require("./modbooks/model");

const app = express();

app.use(express.json());

app.get("/books/getallbooks", async (req, res) => {
  try {
    const books = await Book.find({});

    const successResponse = {
      message: "success",
      books: books,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
  }
});

app.post("/books/addbook", async (req, res) => {
  try {
    //const newBook = await Book.create(req.body); this would work also
    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
    });

    const successResponse = {
      message: "success",
      newBook: newBook,
    };
    res.status(201).json(successResponse);
  } catch (error) {
    console.log(error);
  }
});


app.put("/books/updatebookauthor", async (req, res) => {
  const updatedBook = await Book.updateOne(
    { title: req.body.title },
    { author: req.body.newAuthor }
  );
  const successResponse = {
    message: "success",
    updatedBook: updatedBook,
  };

  res.status(202).json(successResponse);
});

app.delete("/books/deletebook", async (req, res) => {
  const deletedBook = await Book.deleteOne({ title: req.body.title });

  const successResponse = {
    message: "success",
    deletedBook: deletedBook,
  };

  res.status(201).json(successResponse);
});

app.listen(5001, () => console.log("server is listening"));
