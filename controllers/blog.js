const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');
exports.getAllBlogs = async (request, response, next) => {
  try {
    const Blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(Blogs);
  } catch (err) {
    // console.log(err.message);
    next(err);
  }
};
// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7);
//   }
//   return null;
// };

exports.newBlog = async (request, response, next) => {
  try {
    const body = request.body;
    // const token = getTokenFrom(request);
    // const decodedToken = jwt.verify(token, process.env.SECRET);
    // if (!token || !decodedToken.id) {
    //   console.log('here');
    //   // return response.status(401).json({ error: 'token missing or invalid' });
    //   throw { status: 400, message: 'token missing or invalid' };
    //   // return response.status(401).json({ error: 'token missing or invalid' });
    // }
    //  await User.findById(decodedToken.id);
    const user = request.user;
    if (request.body.title === undefined || request.body.url === undefined) {
      throw { status: 400, message: 'url or title are missing' };
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });
    const savedBlog = await blog.save();
    const userBlogs = user.blogs.concat(savedBlog._id);
    await User.findByIdAndUpdate(user._id, { blogs: userBlogs });
    response.status(201).json(savedBlog);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    // const token = getTokenFrom(req);
    // const decodedToken = jwt.verify(token, process.env.SECRET);
    // if (!token || !decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' });
    // }
    // await User.findById(decodedToken.id);
    const user = req.user;
    const id = req.query.id;
    if (!id) {
      throw { status: 400, message: 'miss id' };
    }
    const blogs = await Blog.find({ _id: id });
    if (blogs.length === 0) {
      throw { status: 404, message: 'not found' };
    }
    console.log(user._id);
    if (blogs[0].user.toString() === user._id.toString()) await Blog.findByIdAndRemove(id);

    res.send('blog deleted');
  } catch (err) {
    console.log(err);
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
