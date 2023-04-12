// const express = require("express");
// const app = express();

// app.use(express.json());

// app.get("/anotherroute", (request, response) => {
//   response.send("Hello from another route");
// });

// app.post("/book", (request, response) => {
//   console.log(request.body);

//   const newBook = {
//     id: "1234",
//     title: request.body.title,
//     author: request.body.author,
//     genre: request.body.genre,
//   };

//   const successResponse = {
//     message: "Response sent successfully",
//     book: book,
//   };

//     response.send(successResponse);
// });

const express = require("express");
const app = express();

app.use(express.json());

app.get("/book", (request, response) => {
  const book = {
    title: "Lord of the Rings",
    author: "Tolkein",
    genre: "Fantasy",
  };

  const successResponse = {
    message: "Response sent successfully",
    book: book,
  };

  response.send(successResponse);
});

const books = []; 

app.post("/book", (request, response) => {
  const newBook = {
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
  };

  books.push(newBook);
  console.log(books);

  const successResponse = {
    message: "New Book added successfully",
    book: newBook,
  };

  response.send(successResponse);
});

app.put("/book/:title", (request, response) => {
  const title = request.params.title;
  const updatedBook = {
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
  };

  const index = books.findIndex((book) => book.title === title);

  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    const successResponse = {
      message: "Book updated successfully",
      book: books[index],
    };
    console.log(books);
    response.send(successResponse);
  } else {
    books.push(updatedBook);
    const successResponse = {
      message: "New Book added successfully",
      book: updatedBook,
    };
    console.log(books);
    response.send(successResponse);
  }
});

app.delete("/book/:index", (request, response) => {
  const index = request.params.index;
  if (index >= 0 && index < books.length) {
    const deletedBook = books.splice(index, 1)[0];
    const successResponse = {
      message: "Book deleted successfully",
      book: deletedBook,
    };
    console.log(books);
    response.send(successResponse);
  } else {
    const errorResponse = {
      message: "Invalid index",
    };

    response.status(400).send(errorResponse);
  }
});

app.listen(5002, () => console.log("server is listening"));
