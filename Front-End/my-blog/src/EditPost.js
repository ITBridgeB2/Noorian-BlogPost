import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

const blockedWords = ['badword1', 'example', 'test'];

const EditPost = ({ posts, setPosts }) => {
  const { id } = useParams();
  const index = parseInt(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    photo: '',
    author: '',
    date: '',
    type: '',
  });

  useEffect(() => {
    if (posts[index]) {
      setFormData(posts[index]);
    } else {
      navigate('/blogpost');
    }
  }, [index, posts, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files.length > 0) {
      setFormData({ ...formData, photo: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const containsBlockedWords = (text) => {
    return blockedWords.some(word => text.toLowerCase().includes(word));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (containsBlockedWords(formData.title) || containsBlockedWords(formData.content)) {
      alert('❌ Post contains blocked words. It will not be submitted.');
      return;
    }

    const updatedPosts = [...posts];
    updatedPosts[index] = formData;
    setPosts(updatedPosts);
    navigate('/blogpost');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Post Title" value={formData.title} onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
        <textarea name="content" placeholder="Post Content" value={formData.content} onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', height: '100px' }} />
        <input type="file" name="photo" onChange={handleChange} style={{ marginBottom: '10px' }} />
        <input type="text" name="author" placeholder="Author Name" value={formData.author} onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
        <select name="type" value={formData.type} onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px' }}>
          <option value="">-- Select Type --</option>
          <option value="Travel">Travel</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Esports">Esports</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px' }}>Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
