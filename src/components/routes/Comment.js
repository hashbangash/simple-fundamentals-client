import React from 'react'
import { Link } from 'react-router-dom'
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

const Comment = props => {
  console.log('props in Comment', props)

  return (
    <Box key={props.id}>
      <p className="commentText">
      &quot;{props.commentText}&quot;
      </p>
      <p className="author">
        {(props.author !== null && props.author !== '') ? `by ${props.author}` : 'by Anonymous'}
      </p>
      <p className="created-at">
      date posted: {props.created_at}
      </p>
      {(props.user_id === props.user.id) &&
        <Link to={`/cards/${props.card_id}/comments/${props.id}/edit`}>
          <Button className="btn btn-primary btn-sm edit" data-id={props.id}>
            edit
          </Button>
        </Link>}
      {(props.user_id === props.user.id) && <Button className="btn btn-danger btn-sm delete" data-id={props.id}>delete</Button>}
    </Box>
  )
}
export default Comment
