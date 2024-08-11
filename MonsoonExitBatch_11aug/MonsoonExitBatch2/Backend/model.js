const mongoose = require('mongoose');
const schema = mongoose.Schema({
  EmpName: String,
  designation: String,
  empId: String,
  img_url: String,
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
