import React, { useState, useRef } from 'react';
import axios from 'axios';
function Login({ shownLogin, showNewBlog }) {
  const [userToken, setuserToken] = useState('initialState');
  const username = useRef('nitialValue');
  const password = useRef('initialValue');
  const title = useRef('nitialValue');
  const author = useRef('initialValue');
  const likes = useRef('nitialValue');
  const url = useRef('initialValue');
  const [user, setUser] = useState('');
  const signIn = async () => {
    let response = await axios.post('http://localhost:3003/api/login', {
      username: username.current.value,
      password: password.current.value,
    });
    if (response.data === 'problem') {
      return setUser('user wrong');
    } else {
      console.log(response.data);
      setuserToken(response.data.token);
      localStorage.setItem('userToken', response.data.token);
      return setUser(`${response.data.name} is logged in`);
    }
  };
  const logout = () => {
    setuserToken('');
    setUser('');
    localStorage.removeItem('userToken');
  };
  const addBlog = async () => {
    console.log('er');
    // try {
    const response = await axios.post(
      'http://localhost:3003/api/blogs',
      {
        title: title.current.value,
        author: author.current.value,
        url: url.current.value,
        likes: likes.current.value,
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    console.log(response);
    title.current.value = '';
    author.current.value = '';
    url.current.value = '';
    likes.current.value = '';
    // } catch {
    //   console.log('u need to login first');
    // }
  };
  return (
    <div>
      <div style={{ display: shownLogin }}>
        <input ref={username} type='text' placeholder='username'></input>
        <input ref={password} type='text' placeholder='password'></input>
        <button type='button' onClick={signIn}>
          login
        </button>
        <button type='button' onClick={logout}>
          log out
        </button>
      </div>
      <p>{user}</p>
      <div style={{ display: showNewBlog }}>
        <p>add blog</p>
        <form>
          <input placeholder='title' type='text' ref={title}></input>
          <br />
          <input placeholder='author' type='text' ref={author}></input>
          <br />
          <input placeholder='url' type='text' ref={url}></input>
          <br />
          <input placeholder='likes' type='number' ref={likes}></input>
          <button type='button' onClick={addBlog}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
