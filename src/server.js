require("dotenv").config();
require("./db/connection");

const express = require("express");

//no longer required thanks to refactoring
// const Book = require("./modbooks/model");

const bookRouter = require("./modbooks/routes");

const app = express();


app.use(express.json());

app.use(bookRouter);

app.listen(5001, () => console.log("server is listening"));
