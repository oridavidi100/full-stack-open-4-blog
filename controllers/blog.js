const Blog = require('../models/blogSchema');
exports.getAllBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};
exports.newBlog = (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    throw { status: 400, message: 'url or title are missing' };
  }
  const blog = new Blog(request.body);
  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      throw { status: 400, message: 'miss id' };
    }
    const blogs = await Blog.find({ _id: id });
    if (blogs.length === 0) {
      throw { status: 404, message: 'not found' };
    }
    const blog1 = await Blog.findByIdAndRemove(id);

    res.send('blog deleted');
  } catch (err) {
    next(err);
  }
};

exports.updateLikes = async (req, res, next) => {
  try {
    const { likes, id } = req.query;
    if (!id || !likes) {
      throw { status: 400, message: 'miss ' };
    }
    const blogs = await Blog.findOneAndUpdate({ id }, { likes });
    if (blogs === null) {
      throw { status: 404, message: 'not found' };
    }
    res.send(`${blogs.title} updated`);
  } catch (err) {
    next(err);
  }
};
