import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import CommentForm from '../shared/CommentForm'

const CommentEdit = props => {
  console.log('props in CommentEdit', props)
  const [commentData, setComment] = useState({ commentText: '', author: '' })
  const [updatedComment, setUpdatedComment] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/comments/${props.match.params.id}`)
      .then(res => setComment(res.data.comment))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...commentData }, updatedField)
    // React doesn't like mutating objects/storing its data without using this.setState
    // destructuring the comment, making a copy of the object to update it with the modified field
    setComment(editedComment)
    console.log('editedComment', editedComment)
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
    console.log('formatted comment', comment)
    axios({
      url: `${apiUrl}/comments/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: comment
    })
      .then(() => setUpdatedComment(true))
      .catch(console.error)
  }

  if (updatedComment) {
    return <Redirect to={`/cards/${props.match.params.id}`} />
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
