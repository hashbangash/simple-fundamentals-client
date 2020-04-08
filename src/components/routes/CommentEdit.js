import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import CommentForm from '../shared/CommentForm'
import messages from '../AutoDismissAlert/messages'

const CommentEdit = props => {
  const currentUrl = props.match.url
  const cardId = currentUrl.split('/')[2]
  const [commentData, setComment] = useState({ commentText: '', author: '' })
  const [updatedComment, setUpdatedComment] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/comments/${props.match.params.id}`)
      .then(res => setComment(res.data.comment))
      .catch(() => props.msgAlert({
        message: messages.genericFailure,
        variant: 'failure'
      }))
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...commentData }, updatedField)
    // React doesn't like mutating objects/storing its data without using this.setState
    // destructuring the comment, making a copy of the object to update it with the modified field
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const comment = {
      comment: {
        commentText: commentData.commentText,
        author: commentData.author
      }
    }
    axios({
      url: `${apiUrl}/comments/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: comment
    })
      .then(() => setUpdatedComment(true))
      .then(() => props.msgAlert({
        message: messages.editCommentSuccess,
        variant: 'success'
      }))
      .catch(() => props.msgAlert({
        message: messages.editCommentFailure,
        variant: 'failure'
      }))
  }

  if (updatedComment) {
    return <Redirect to={`/cards/${cardId}`} />
  }

  return (
    <Fragment>
      <CommentForm
        comment={commentData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/cards/${props.cardId}/`}
      />
    </Fragment>
  )
}
export default CommentEdit
