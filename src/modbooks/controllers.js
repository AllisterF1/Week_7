const Book = require("./model");

//Returns a list of all books stored on the db - refactored
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    res.status(200).json({ message: "success", books: books });
  } catch (error) {
    console.log(error);
  }
};

//Adds a new book to the db
const addNewBook = async (req, res) => {
  try {
    //const newBook = await Book.create(req.body); this would work also
    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
    });

    res.status(201).json({ message: "success", newBook: newBook });
  } catch (error) {
    console.log(error);
  }
};

//Amends the Author on a book stored in the db via title
const updateBookAuthor = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.body.title });
    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }
    const updatedBook = await Book.updateOne(
      { title: req.body.title },
      { author: req.body.newAuthor }
    );
    res.status(202).json({ message: "success", updatedBook: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating book author" });
  }
};

//Deletes a single book from the db via title
const deleteBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.body.title });
    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }
    const deletedBook = await Book.deleteOne({ title: req.body.title });
    res
      .status(201)
      .json({ message: "successfully deleted", deletedBook: deletedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error deleting book" });
  }
};

//Deletes all books from the db
const deleteAllBooks = async (req, res) => {
  try {
    const deletedAllBooks = await Book.deleteMany({});
    res.status(201).json({
      message: "success, all books have been deleted",
      deletedAllBooks: deletedAllBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error deleting all books" });
  }
};

//searches via title and updates any field
const updateAnyByTitle = async (req, res) => {
  try {
    const filter = { title: req.body.title };
    const update = {
      title: req.body.newTitle,
      author: req.body.newAuthor,
      genre: req.body.newGenre,
    };
    const updatedBook = await Book.updateOne(filter, update);

    res
      .status(202)
      .json({ message: "successfully updated", updatedBook: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating book" });
  }
};

//dynamic version which searches via title and updates any field. Title changes require use of newAuthor in body
const updateAnyDynamic = async (req, res) => {
  try {
    const filter = { title: req.body.title };
    const update = { $set: {} };
    for (const key in req.body) {
      if (key !== "title") {
        update.$set[key] = req.body[key];
      }
    }
    update.$set.title = req.body.newTitle;
    const updatedBook = await Book.updateMany(filter, update);

    res
      .status(202)
      .json({ message: "successfully updated", updatedBook: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating book" });
  }
};

module.exports = {
  getAllBooks,
  addNewBook,
  updateBookAuthor,
  deleteBookByTitle,
  deleteAllBooks,
  updateAnyByTitle,
  updateAnyDynamic,
};
