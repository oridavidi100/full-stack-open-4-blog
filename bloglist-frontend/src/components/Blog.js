import axios from 'axios';
import React, { useState } from 'react';
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [blogView, setblogView] = useState('');
  const view = () => {
    if (blogView === '') {
      setblogView(
        <div>
          {' '}
          <p>url:{blog.url}</p>
          <p>Likes:{blog.likes}</p>
        </div>
      );
    } else setblogView('');
  };
  const like = async (e) => {
    let response = await axios.put(`/api/blogs/update?id=${e.target.value}&likes=${blog.likes + 1}`);
    console.log(response);
  };
  const Delete = async () => {
    const userToken = localStorage.getItem('userToken');
    console.log(userToken);
    const response = await axios.delete(`http://localhost:3003/api/blogs?id=${blog.id}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log(response);
  };
  return (
    <div style={blogStyle}>
      <div>
        title:{blog.title}
        <br />
        author:{blog.author}
      </div>
      <p>{blogView}</p>
      <button type='button' onClick={view}>
        view
      </button>
      <button type='button' onClick={like} value={blog.id}>
        Like
      </button>
      <button type='button' onClick={Delete}>
        Delete
      </button>
    </div>
  );
};

export default Blog;
