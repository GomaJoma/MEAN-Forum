const mongoose = require('mongoose');
const dbConfig = require('../config/db');

const PostSchema = mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // sender: {
  //   type: String,
  //   required: true
  // }
});

const Post = module.exports = mongoose.model('PostSchema', PostSchema);

module.exports.addNewPostToDB = function(newPost, callback) {
  newPost.save(callback);
}

module.exports.getPostById = function (id, callback) {
  Post.findById(id, callback);
};

module.exports.deletePost = function (id, callback) {
  // console.log(id);
  Post.findOneAndRemove({_id: id}, callback);
};

module.exports.editPost = function (id, header, content, callback) {
  // console.log(id);
  Post.findOneAndUpdate({_id: id}, {$set:{header: header, content: content}}, callback);
};
