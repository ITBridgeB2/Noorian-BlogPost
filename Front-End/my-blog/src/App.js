import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Travel from './Travel';
import Movies from './Movies';
import Sports from './Sports';
import Esports from './Esports';
import Login from './Login';
import Register from './Register';
import BlogPost from './BlogPost';
import CreateNewPost from './CreateNewPost';
import EditPost from './EditPost';

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/esports" element={<Esports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Blog Post System */}
        <Route path="/blogpost" element={<BlogPost posts={posts} setPosts={setPosts} />} />
        <Route path="/create" element={<CreateNewPost posts={posts} setPosts={setPosts} />} />
        <Route path="/edit/:id" element={<EditPost posts={posts} setPosts={setPosts} />} />
      </Routes>
    </Router>
  );
}

export default App;
