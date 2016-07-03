const Blog = require('../models/Blog');

//======================
//   Admin side only
//======================

exports.newBlog = (req, res) => {

  res.render('admin/newPost', {
    title: 'Add new blog post'
  });

};

exports.postBlog = (req, res) => {


  const newPost = new Blog({
    title: req.body.title,
    body: req.body.body,
    author: req.user.profile.firstName,
    files: req.body.files
  })


  newPost.save((err, newPost) => {
    if (err) {
      console.log(err);
    }
    console.log(newPost);

    req.flash('success', { msg: 'You have created a new post!' });
    res.redirect('/admin');
  });
};

exports.getPosts = (req, res) => {

  Blog.find({}, (err, blogArr) => {
    var blogSort = blogArr.reverse();
    res.render('admin/viewPosts', {
      title: 'View/Edit blog posts',
      blog: blogSort
    });
  });
};

exports.showPost = (req, res) => {
  var id = req.params.id;

  Blog.findById(id, (err, blogPost) => {
    res.render('admin/post', {
      title: 'View/Edit blog posts',
      blogPost: blogPost
    });
  });

};

exports.updatePost = (req, res) => {

  var id = req.body._id;
  console.log(id)
  Blog.findById(id, (err, blog) => {
    console.log(req.body)
    console.log('this is the blog ' + blog)
    blog.title = req.body.title || '';
    blog.body = req.body.body || '';

    blog.save((err, blog) => {
      if (err) {
        console.log(err);
      }
      console.log(blog);

      req.flash('success', { msg: 'Your post has been updated' });
      res.redirect('/admin/viewPosts')
    });
  });
};


exports.deletePost = (req, res) => {
console.log('deleting ' + req.body._id)
  Blog.remove({ _id: req.body._id}, (err) => {
    if (err) {
      return next(err); }
    req.flash('info', { msg: 'Your post has been deleted.' });
    res.redirect('/admin/viewPosts');
  });
};

//================================
//    Display blog on homepage
//================================

exports.getBlogHome = (req, res) => {

  Blog.find({}, (err, blogArr) => {
    var blogSort = blogArr.reverse();
    res.render('home', {
      title: 'The Park Island Hub',
      blogHome: blogSort
    });
  });
};
