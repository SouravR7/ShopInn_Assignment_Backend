const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
const { book_collection } = require("./Connector");

app.use(bodyParser.json());
app.use(cors());

//Create Data and save to the DB
app.post("/api/create", (req, res) => {
  const { Author, Title, Isbn, Relese_Date } = req.body;
  if (!Author || !Title || !Isbn || !Relese_Date) {
    return res.status(400).json({ msg: "*Please fill all the field" });
  }
  const books = new book_collection({
    Author,
    Title,
    Isbn,
    Relese_Date,
  });

  books
    .save()
    .then((book) => res.json(book))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//get all the data from DB
app.get("/api/get", (req, res) => {
  book_collection
    .find()
    .then((book) => {
      res.json(book);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

//Delete any data using id
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  book_collection
    .findByIdAndDelete(id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ message: "Book Not found" }));
});

//Update data(partially) using patch
app.patch("/api/update/:id", (req, res) => {
  const id = req.params.id;
  book_collection
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((book) => {
      res.json(book);
    })
    .catch((err) => res.status(404).json({ message: "Book Not found", err }));
});

module.exports = app;
