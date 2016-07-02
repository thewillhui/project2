const Blog = require('../models/Blog');

exports.getBlog = (req, res) => {

  res.render('admin/newPost', {
    title: 'Add new blog post'
  });

};

exports.postBlog = (req, res) => {

  console.log(req.user);

  const newPost = new Blog({
    title: req.body.title,
    body: req.body.body,
    author: req.user.profile.firstName
  })

  newPost.save(function(err, newPost) {
    if (err) {
      console.log(err);
    }
    console.log(newPost);

    req.flash('success', { msg: 'You have created a new post!' });
    res.redirect('/admin');
  });
};

exports.getPosts = (req, res) => {

  Blog.find({}, function(err, blogArr) {
    var blogSort = blogArr.reverse();
    res.render('admin/viewPosts', {
      title: 'View/Edit blog posts',
      blog: blogSort
    });
  });
};

exports.showPost = (req, res) => {

var id = req.params.id;

  Blog.findById(id, function(err, blogPost) {
    res.render('admin/post', {
      title: 'View/Edit blog posts',
      blogPost: blogPost
    });
  });
};