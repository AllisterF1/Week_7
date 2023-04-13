require("dotenv").config();
require("./db/connection");

const express = require("express");

const Book = require("./modbooks/model");

const app = express();

app.use(express.json());


//Returns a list of all books stored on the db
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



//Creates a new book and stores it to the db
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



//Amends the Author on a book stored in the db via title
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



//Deletes a single book from the db via title
app.delete("/books/deletebook", async (req, res) => {
  const deletedBook = await Book.deleteOne({ title: req.body.title });

  const successResponse = {
    message: "successfully deleted",
    deletedBook: deletedBook,
  };

  res.status(201).json(successResponse);
});



//Deletes all books from the db
app.delete("/books/deleteallbooks", async (req, res) => {
  const deletedAllBooks= await Book.deleteMany({ });

  const successResponse = {
    message: "success, all books have been deleted",
    deletedAllBooks: deletedAllBooks,
  };

  res.status(201).json(successResponse);
});



//searches via title and updates any field
app.put("/books/updateany", async (req, res) => {
  
    const filter = { title: req.body.title };
    const update = { 
      title: req.body.newTitle,
      author: req.body.newAuthor,
      genre: req.body.newGenre
    };
    const updatedBook = await Book.updateOne(filter, update);
    const successResponse = {
      message: "successfully updated",
      updatedBook: updatedBook,
    };
    res.status(202).json(successResponse);
 
});

//dynamic version which searches via title and updates any field
app.put("/books/updateanydynamic", async (req, res) => {
  
    const filter = { title: req.body.title };
    const update = { $set: {} };
    for (const key in req.body) {
        if (key !== 'title') {
            update.$set[key] = req.body[key];
        }
    }
    update.$set.title = req.body.newTitle;
    update.$set.author = req.body.newAuthor;
    update.$set.genre = req.body.newGenre; 
    const updatedBook = await Book.updateMany(filter, update);
    const successResponse = {
      message: "successfully updated",
      updatedBook: updatedBook,
    };
    res.status(202).json(successResponse);
 
});


app.listen(5001, () => console.log("server is listening"));


