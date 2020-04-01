import React, { useState, useEffect, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Cards = props => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/cards`)
      .then(res => setCards(res.data.cards))
      .catch(console.error)
  }, [])

  // <Link to={`/cards/${card.id}`}>{card.word}</Link>
  const cardsJSX = cards.map(card => (
    <div key={card.id} className="box">
      <h2 className="word">
        {card.word}
      </h2>
      <p className="definition">
        {card.definition}
      </p>
      <button className="btn btn-primary" data-id={card.id}>Like</button>
    </div>
  ))

  return (
    <Fragment>
      {cardsJSX}
    </Fragment>
  )
}
export default Cards
