const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');
const api = supertest(app);
const users = [
  {
    id: '61ba0f85cfd3ff89ccc50f38',
    username: 'admin',
    name: 'admin',
    password: '12345',
    password: '$2b$10$965dXhqmwOuugIkrbjulPerhmiWn9nIN.clcLAGRH6CmJRMZkZ98O',
    blogs: [],
  },
];
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
  await User.deleteMany({});
  await User.insertMany(users);
});

test('correct amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

test('The unique identifier property of the blog posts is by default _id', async () => {
  const blogs = await Blog.find({});
  expect(blogs[0].id).toBeDefined();
}, 100000);

test('add blog', async () => {
  const newBlog = { title: 'ooo', author: 'ori', url: 'www', likes: 5 };
  await api.post('/api/blogs').send(newBlog);
  let blogs = await Blog.find({});
  blogs = blogs.map(({ title, author, url, likes }) => {
    return {
      title,
      author,
      url,
      likes,
    };
  });
  expect(blogs.length).toBe(initialBlogs.length + 1);
  expect(blogs[blogs.length - 1]).toEqual(newBlog);
}, 100000);

test(' blog missing likes', async () => {
  const newBlog = { title: 'ooo', author: 'ori', url: 'www' };
  await api.post('/api/blogs').send(newBlog);
  let blogs = await Blog.find({});
  blogs = blogs.map(({ title, author, url, likes }) => {
    return {
      title,
      author,
      url,
      likes,
    };
  });
  expect(blogs[blogs.length - 1].likes).toBe(0);
}, 100000);

test('blog missing title', async () => {
  const newBlog = { author: 'ori', url: 'www' };
  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.status).toBe(400);
}, 100000);

test('blog deleted', async () => {
  await api.delete('/api/blogs?id=5a422ba71b54a676234d17fb');
  // const blogs = await Blog.find({});
  const blogsId = await Blog.findById('5a422ba71b54a676234d17fb');
  // expect(blogs.length).toBe(initialBlogs.length - 1);
  expect(blogsId).toBeNull();
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
test('blog update like', async () => {
  await api.put('/api/blogs/update?id=5a422ba71b54a676234d17fb&likes=6');
  const blogsId = await Blog.findOne({ id: '5a422ba71b54a676234d17fb' });
  console.log(blogsId);
  expect(blogsId.likes).toBe(6);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
