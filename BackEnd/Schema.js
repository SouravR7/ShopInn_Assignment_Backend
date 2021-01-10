const { Schema, mongoose } = require("mongoose");

const schema = new Schema({
  Author: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Isbn: {
    type: String,
    required: true,
  },
  Relese_Date: {
    type: String,
    required: true,
  },
});

exports.schema = schema;
