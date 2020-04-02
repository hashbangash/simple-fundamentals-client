import React from 'react'
import { Link } from 'react-router-dom'

const CommentForm = ({ comment, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Comment</label>
    <input
      placeholder="text here"
      value={comment.commentText}
      name="commentText"
      onChange={handleChange}
    />

    <label>Author</label>
    <input
      placeholder="by Anonymous"
      value={comment.author}
      name="author"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default CommentForm
