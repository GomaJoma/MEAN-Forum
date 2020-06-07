const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const config = require('../config/db');


router.post('/add', (req, res) => {
  let newPost = new Post({
    header: req.body.header,
    content: req.body.content
  });
  //console.log(3);

  Post.addNewPostToDB(newPost, (err, post) => {
    if (err)
      res.json({success: false, message: "Post not be added to DataBase"});
    else
      res.json({success: true, message: "Post successfuly added to DataBase"});
  });
});

router.post('/posts/allposts', (req, res) => {
  Post.find({},[],{ sort: { _id: -1 } }, (err, post) => {
    if (err) throw err;
    return res.json({
      success: true,
      data: post
    });
  });
});

router.post('/posts/delete', (req, res) => {
  // console.log(3);
  // console.log(req.body.id);
  Post.deletePost(req.body.id, (err, post) => {
    if (err) throw err;
    // console.log("post deleted");
    return res.json({
      success: true
    });
  });
});

router.post('/posts/edit', (req, res) => {
  // console.log(req);
  // console.log(req.body.post.id, req.body.post.header, req.body.post.content);
  Post.editPost(req.body.post.id, req.body.post.header, req.body.post.content, (err, post) => {
    if (err) throw err;
    // console.log("post deleted");
    return res.json({
      success: true
    });
  });
});
module.exports = router;
