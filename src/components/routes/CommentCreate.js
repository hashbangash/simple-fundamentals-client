import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

class CommentCreate extends Component {
  constructor () {
    super()
    this.state = {
      movie: {
        title: '',
        director: '',
        year: ''
      },
      redirect: null
    }
  }
  handleChange = (event) => {
    // create a new object with key of `name` property on input and
    // `value` with `value` property
    const updatedField = {
      // key in square brackets because it's a variable
      [event.target.name]: event.target.value
    }
    // combine the current movie with updatedField using `Object.assign` method
    const editedMovie = Object.assign(this.state.movie, updatedField)
    // set the state
    this.setState({ movie: editedMovie })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'post',
      url: `${apiUrl}/movies`,
      data: { movie: this.state.movie }
    })
      .then(res => {
        console.log('res', res)
        this.setState({ redirect: <Redirect to={`/movies/${res.data.movie.id}`}/> })
        // data:
        // movie: {id: 3073, title: "ERON IS BEST", director: "Someone Else", year: "2020-03-04", actors: Array(0)}
      })
      .catch(console.error)
  }
  render () {
    // destructure from state
    const { movie, redirect } = this.state
    let createJSX
    // if we've updated the movie, redirect to the show page
    if (redirect) {
      createJSX = redirect
    } else {
      createJSX = (
        <div>
          <h1>Movie Create page</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Title</label>
            <input
              placeholder='a title'
              name='title'
              value={movie.title || ''}
              onChange={this.handleChange}
            />
            <label>Director</label>
            <input
              placeholder='a director'
              name='director'
              value={movie.director || ''}
              onChange={this.handleChange}
            />
            <label>Year</label>
            <input
              placeholder='YYYY/MM/DD'
              name='year'
              value={movie.year || ''}
              type='date'
              onChange={this.handleChange}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      )
    }
    return createJSX
  }
}
export default CommentCreate
