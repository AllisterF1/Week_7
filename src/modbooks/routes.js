const { Router } = require("express");
const bookRouter = Router();
const Book = require("./model");
const {
  getAllBooks,
  addNewBook,
  updateBookAuthor,
  deleteBookByTitle,
  deleteAllBooks,
  updateAnyByTitle,
  updateAnyDynamic,
} = require("./controllers");

//Returns a list of all books stored on the db
bookRouter.get("/books/getallbooks", getAllBooks);

//Adds a new book to the db
bookRouter.post("/books/addbook", addNewBook);

//Amends the Author on a book stored in the db via title
bookRouter.put("/books/updatebookauthor", updateBookAuthor);

//Deletes a single book from the db via title
bookRouter.delete("/books/deletebook", deleteBookByTitle);

//Deletes all books from the db
bookRouter.delete("/books/deleteallbooks", deleteAllBooks);

//searches via title and updates any field
bookRouter.put("/books/updateany", updateAnyByTitle);

//dynamic version which searches via title and updates any field
bookRouter.put("/books/updateanydynamic", updateAnyDynamic);

module.exports = bookRouter;
