const mongoose = require("mongoose");
const { schema } = require("./Schema");
const Mogodb_String =
  "mongodb+srv://Admin:Admin@cluster0.gg7ua.mongodb.net/RuleEngine?retryWrites=true&w=majority";

mongoose
  .connect(Mogodb_String, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Establish"))
  .catch((err) => console.log("Error while connect", err));

const book_collection = mongoose.model("Books", schema);
exports.book_collection = book_collection;
