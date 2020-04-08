import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import CommentForm from '../shared/CommentForm'
import messages from '../AutoDismissAlert/messages'

const CommentCreate = props => {
  const [commentData, setComment] = useState({ commentText: '', author: '' })
  const [createdCommentCardId, setCreatedCommentCardId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...commentData }, updatedField)
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const cardId = parseInt(props.match.params.id, 10)
    const comment = {
      comment: {
        user_id: props.user.id,
        commentText: commentData.commentText,
        author: commentData.author,
        card_id: cardId
      }
    }
    console.log('formatted comment in CommentCreate', comment)
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: comment
    })
      .then(res => {
        setCreatedCommentCardId(res.data.comment.card.id)
      })
      .then(() => props.msgAlert({
        message: messages.createCommentSuccess,
        variant: 'success'
      }))
      .catch(() => props.msgAlert({
        message: messages.createCommentFailure,
        variant: 'failure'
      }))
  }

  if (createdCommentCardId) {
    return <Redirect to={`/cards/${createdCommentCardId}`} />
  }

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
