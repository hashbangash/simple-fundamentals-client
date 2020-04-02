import React, { useState, Fragment } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CommentForm from '../shared/CommentForm'

const CommentCreate = props => {
  console.log('props', props)
  const [commentData, setComment] = useState({ commentText: '', author: '' })
  const [setCreatedCommentId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...commentData }, updatedField)
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // console.log('event', event)
    // console.log('comment', comment)
    // console.log('props', props)
    const cardId = parseInt(props.match.params.id, 10)
    const comment = {
      comment: {
        user_id: props.user.id,
        commentText: commentData.commentText,
        author: commentData.author,
        card_id: cardId
      }
    }
    console.log('formatted comment', comment)
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      data: comment
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
        comment={commentData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Fragment>
  )
}

export default CommentCreate
