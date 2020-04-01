import React, { useState, useEffect, Fragment } from 'react'
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

const Like = styled.span`
  margin: 0 0.25rem 0 0.25rem;
`

const Comment = styled.span`
  margin: 0 0.25rem 0 0.25rem;
`

const Cards = props => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/cards`)
      .then(res => {
        setCards(res.data.cards)
        console.log(res.data.cards)
      })
      .catch(console.error)
  }, [])

  const cardsJSX = cards.map(card => (
    <Box key={card.id}>
      <h2 className="word">
        {card.word}
      </h2>
      <p className="definition">
        {card.definition}
      </p>
      <Like>{card.likes.length} Like(s)</Like>
      <Comment>
        <Link to={`/cards/${card.id}`}>{card.comments.length} Comment(s)</Link>
      </Comment>
      <Button className="btn btn-primary btn-sm like" data-id={card.id}>Like</Button>
      <Button className="btn btn-secondary btn-sm comment" data-id={card.id}>Comment</Button>
    </Box>
  ))

  return (
    <Fragment>
      {cardsJSX}
    </Fragment>
  )
}
export default Cards
