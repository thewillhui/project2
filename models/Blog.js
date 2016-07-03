const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {type: Date, default: Date.now},
  author: String,
  body: {type: String, required: true},
  files: String
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
