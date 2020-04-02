import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import CommentForm from '../shared/CommentForm'
import Layout from '../shared/Layout'
const CommentEdit = props => {
  const [comment, setComment] = useState({ title: '', director: '', year: '' })
  const [updatedComment, setUpdatedComment] = useState(false)
  useEffect(() => {
    axios(`${apiUrl}/comments/${props.match.params.id}`)
      .then(res => setComment(res.data.comment))
      .catch(console.error)
  }, [])
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...comment }, updatedField)
    // React doesn't like mutating objects/storing its data without using this.setState
    // destructuring the comment, making a copy of the object to update it with the modified field
    setComment(editedComment)
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/comments/${props.match.params.id}`,
      method: 'PATCH',
      data: { comment: comment }
    })
      .then(() => setUpdatedComment(true))
      .catch(console.error)
  }
  if (updatedComment) {
    return <Redirect to={`/comments/${props.match.params.id}`} />
  }
  return (
    <Layout>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/comments/${props.match.params.id}`}
      />
    </Layout>
  )
}
export default CommentEdit
