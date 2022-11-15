const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quotesSchema = new Schema(
  {
    qRef: Number,
    content: String,
    author: String
  },
  {
    collection: 'quotes_data'
  }
);

const quotes = mongoose.model('quotes_coll', quotesSchema);

module.exports = quotes;