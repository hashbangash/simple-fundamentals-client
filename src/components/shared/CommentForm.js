import React from 'react'
import { Link } from 'react-router-dom'

const CommentForm = ({ comment, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Comment</label>
    <input
      placeholder="A Wonderful Film"
      value={comment.commentText}
      name="title"
      onChange={handleChange}
    />

    <label>Author</label>
    <input
      placeholder="John Doe"
      value={comment.author}
      name="director"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default CommentForm
