import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import styled from 'styled-components'
import Comment from './Comment'
import messages from '../AutoDismissAlert/messages'

const Box = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 2px 2px 0 0;
  border: 2px solid white;
`
const Button = styled.button`
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
        createJSX(res.data.card)
      })
      .catch(() => props.msgAlert({
        message: messages.showCardFailure,
        variant: 'failure'
      }))
  }, [])

  const createJSX = (card) => {
    // use card.comments to create a Comment for each comment in comments
    let commentsJSX
    if (props.user !== null) {
      commentsJSX = card.comments.map(comment => (
        <Comment
          key={comment.id}
          user={props.user}
          id={comment.id}
          commentText={comment.commentText}
          author={comment.author}
          created_at={comment.created_at}
          user_id={comment.user_id}
          card_id={comment.card_id}
          msgAlert={props.msgAlert}
        />
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
        {(props.user !== null) &&
          <Fragment>
            <Link to={`/cards/${props.match.params.id}/create-comment`}>
              <Button className="btn btn-secondary btn-sm comment" data-id={card.id}>add comment</Button>
            </Link>
          </Fragment>
        }
      </Box>
      {commentsJSX}
    </Fragment>
  )
}

export default Card
