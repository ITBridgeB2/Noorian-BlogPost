import React from 'react';

export default function Post() {
  return (
    <div className="page">
      <h2>Sample Post Title</h2>
      <div className="post-photo">[Photo]</div>
      <div>Author Name</div>
      <button className="btn">Add Comment</button>
      <div className="comment-form">
        <input type="text" placeholder="Name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <textarea placeholder="Add comment" className="input" />
        <button className="btn">Submit</button>
      </div>
    </div>
  );
}
