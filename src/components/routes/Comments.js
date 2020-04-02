import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import styled from 'styled-components'

const Box = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 2px 2px 0 0;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
`

const Button = styled.button`
  margin: 0 0.25rem 0 0.25rem;
`

const Comments = props => {
  console.log('props in Comments', props)
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/comments`)
      .then(res => {
        setComments(res.data.comments)
      })
      .catch(console.error)
  }, [])

  let cardsJSX
  if (props.user !== null) {
    console.log('user id', props.user.id)
    cardsJSX = comments.map(comment => (
      <Box key={comment.id}>
        <p className="commentText">
        &quot;{comment.commentText}&quot;
        </p>
        <p className="author">
          {(comment.author !== null && comment.author !== '') ? `by ${comment.author}` : 'by Anonymous'}
        </p>
        <p className="created-at">
        date posted: {comment.created_at}
        </p>
        {(comment.user.id === props.user.id) && <Button className="btn btn-primary btn-sm edit" data-id={comment.id}>Edit</Button>}
        {(comment.user.id === props.user.id) && <Button className="btn btn-danger btn-sm delete" data-id={comment.id}>Delete</Button>}
      </Box>
    ))
  } else {
    cardsJSX = comments.map(comment => (
      <Box key={comment.id}>
        <p className="commentText">
        &quot;{comment.commentText}&quot;
        </p>
        <p className="author">
          {(comment.author !== null && comment.author !== '') ? `by ${comment.author}` : 'by Anonymous'}
        </p>
        <p className="created-at">
        date posted: {comment.created_at}
        </p>
      </Box>
    ))
  }

  return (
    <Fragment>
      {cardsJSX}
    </Fragment>
  )
}
export default Comments
