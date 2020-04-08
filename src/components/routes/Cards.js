import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import styled from 'styled-components'
import messages from '../AutoDismissAlert/messages'

const Box = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 2px 2px 0 0;
  border: 2px solid white;
`

const NumComments = styled.span`
  margin: 0 0.25rem 0 0.25rem;
  text-decoration: underline;

  &:hover {
    background: yellow;
  }
`

const Cards = props => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/cards`)
      .then(res => {
        setCards(res.data.cards)
      })
      .catch(() => props.msgAlert({
        message: messages.indexCardsFailure,
        variant: 'failure'
      }))
  }, [])

  const cardsJSX = cards.map(card => (
    <Box key={card.id}>
      <h2 className="word">
        {card.word}
      </h2>
      <p className="definition">
        {card.definition}
      </p>
      <NumComments>
        <Link to={`/cards/${card.id}`}>{card.comments.length} Comment(s)</Link>
      </NumComments>
    </Box>
  ))

  return (
    <Fragment>
      {cardsJSX}
    </Fragment>
  )
}
export default Cards
