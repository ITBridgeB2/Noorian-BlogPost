import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="title">My Blog</div>
        <div className="auth-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/register" className="btn register">Register</Link>
        </div>
      </div>

      <div className="categories-grid">
        <Link to="/travel" className="category-box travel">
          <div className="category-name">Travel</div>
        </Link>
        <Link to="/movies" className="category-box movies">
          <div className="category-name">Movies</div>
        </Link>
        <Link to="/sports" className="category-box sports">
          <div className="category-name">Sports</div>
        </Link>
        <Link to="/esports" className="category-box esports">
          <div className="category-name">Esports</div>
        </Link>
      </div>
    </div>
  );
}
