const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  userId : {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;