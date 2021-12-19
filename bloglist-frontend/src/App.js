import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/login';
import blogService from './services/blogs';
// import LoginForm from './components/loginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [shownLogin, setshown] = useState('none');
  const [showNewBlog, setshowNewBlog] = useState('none');

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(
        blogs.sort((a, b) => {
          return a.likes - b.likes;
        })
      );
    });
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <button
        type='button'
        onClick={() => {
          if (shownLogin === 'block') setshown('none');
          else setshown('block');
        }}
      >
        log in
      </button>
      <Login shownLogin={shownLogin} showNewBlog={showNewBlog} />
      <button
        type='button'
        onClick={() => {
          if (showNewBlog === 'block') setshowNewBlog('none');
          else setshowNewBlog('block');
        }}
      >
        create new blog
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
