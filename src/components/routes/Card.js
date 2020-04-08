import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
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

const NumLikes = styled.span`
  margin: 0 0.25rem 0 0.25rem;
`

const Card = props => {
  const [card, setCard] = useState(null)
  const [commentsJSX, setCommentsJSX] = useState(null)

  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/cards/${props.match.params.id}`)
      .then(res => {
        setCard(res.data.card)
        console.log('card', res.data.card)
        createJSX(res.data.card)
      })
      .catch(console.error)
  }, [])

  const createJSX = (card) => {
    // use card.comments to create a Comment for each comment in comments
    let commentsJSX
    if (props.user !== null) {
      commentsJSX = card.comments.map(comment => (
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
          {(comment.user_id === props.user.id) &&
            <Link to={`/cards/${comment.card_id}/comments/${comment.id}/edit`}>
              <Button className="btn btn-primary btn-sm edit" data-id={comment.id}>
                Edit
              </Button>
            </Link>}
          {(comment.user_id === props.user.id) && <Button className="btn btn-danger btn-sm delete" data-id={comment.id}>Delete</Button>}
        </Box>
      ))
    } else {
      commentsJSX = card.comments.map(comment => (
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
    setCommentsJSX(commentsJSX)
  }

  if (!card) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <Box key={card.id}>
        <h2 className="word">
          {card.word}
        </h2>
        <p className="definition">
          {card.definition}
        </p>
        <NumLikes>{card.likes.length} Like(s)</NumLikes>
        {(props.user !== null) &&
          <Fragment>
            <Button className="btn btn-primary btn-sm like" data-id={card.id}>Like</Button>
            <Link to={`/cards/${props.match.params.id}/create-comment`}>
              <Button className="btn btn-secondary btn-sm comment" data-id={card.id}>Comment</Button>
            </Link>
          </Fragment>
        }
      </Box>
      {commentsJSX}
    </Fragment>
  )
}

export default Card
