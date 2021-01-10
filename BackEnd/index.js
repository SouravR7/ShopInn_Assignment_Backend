const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
const { book_collection } = require("./Connector");
const port = 7000;
app.use(bodyParser.json());
app.use(cors());

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

app.get("/api/get", (req, res) => {
  book_collection
    .find()
    .then((book) => {
      res.json(book);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  book_collection
    .findByIdAndDelete(id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ message: "Book Not found" }));
});

app.listen(port, () => console.log(`App Listen on Port ${port}`));
