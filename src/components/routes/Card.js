import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import styled from 'styled-components'
import Comments from './Comments'

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
  console.log('props in Card', props)
  const [card, setCard] = useState(null)
  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/cards/${props.match.params.id}`)
      // Make sure to update this.setState to our hooks setMovie function
      .then(res => setCard(res.data.card))
      .catch(console.error)
  }, [])

  if (!card) {
    return <p>Loading...</p>
  }

  // <Nav.Link href='#create-comment'>Add Comment</Nav.Link>
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
        <Button className="btn btn-primary btn-sm like" data-id={card.id}>Like</Button>
        <Link to={`/cards/${props.match.params.id}/create-comment`}>
          <Button className="btn btn-secondary btn-sm comment" data-id={card.id}>Comment</Button>
        </Link>
      </Box>
      <Comments
        user={props.user}
      />
    </Fragment>
  )
}

export default Card
