import React, { useState, Fragment } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CommentForm from '../shared/CommentForm'

const CommentCreate = props => {
  const [comment, setComment] = useState({ commentText: '', author: '' })
  const [setCreatedCommentId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...comment }, updatedField)
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log('event', event)
    console.log('comment', comment)
    console.log('props', props)
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      data: { comment }
    })
      .then(res => setCreatedCommentId(res.data.comment.id))
      .catch(console.error)
  }

  // if (createdCommentId) {
  //   return <Redirect to={`/card/${createdCommentId}`} />
  // }

  return (
    <Fragment>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Fragment>
  )
}

export default CommentCreate
