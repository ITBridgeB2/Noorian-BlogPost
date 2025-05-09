import React, { useState } from "react";
import "./CreateNewPost.css";
import { useNavigate, Link } from "react-router-dom";

const BAD_WORDS = ["Bugger", "Shit", "Bloody", "Bollocks", "Bullshit", "Bastard", "Pissed", "Arse", "Bitch", "Cow", "Crap", "Cunt", "Damn", "Son of a bitch", "Arsehole", "Balls", "Crappity", "Fuck", "Jesus Christ", "Motherfucker"];

export default function CreateNewPost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    author: "",
    category: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containsBadWords = (text) => {
    const lowerCaseText = text.toLowerCase();
    return BAD_WORDS.some(word => lowerCaseText.includes(word));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      containsBadWords(formData.title) ||
      containsBadWords(formData.content) ||
      containsBadWords(formData.author)
    ) {
      alert("Bad words are not allowed in the blog post.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);

      setFormData({
        title: "",
        content: "",
        date: "",
        author: "",
        category: ""
      });

      navigate("/blogpost");
    } catch (error) {
      alert("Failed to submit post. Please try again later.");
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          required
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          required
          value={formData.author}
          onChange={handleChange}
        />
        
        <select
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
        >
          <option value="" disabled>Select Category</option>
          <option value="travel">Travel</option>
          <option value="cooking">Movies</option>
          <option value="sports">Sports</option>
          <option value="esports">Esports</option>
        </select>

        <button type="submit">Upload</button>
      </form>

      <Link to="/blogpost" className="back-link">
        Back to Blog
      </Link>
    </div>
  );
}