import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './shared/AuthenticatedRoute'
import AutoDismissAlert from './AutoDismissAlert/AutoDismissAlert'
import Header from './shared/Header'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'
import ChangePassword from './auth/ChangePassword'
import Cards from './routes/Cards'
import Card from './routes/Card'
import CommentCreate from './routes/CommentCreate'
import CommentEdit from './routes/CommentEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => {
            return <h2>an accessible flashcard app.</h2>
          }}
          />
          <Route exact path='/cards' render={({ match }) => (
            <Cards
              msgAlert={this.msgAlert} user={user} match={match}
            />
          )}/>
          <Route exact path='/cards/:id' user={user} render={({ match }) => (
            <Card
              msgAlert={this.msgAlert} user={user} match={match}
            />
          )}/>
          <AuthenticatedRoute user={user} exact path='/cards/:id/create-comment' render={({ match }) => (
            <CommentCreate
              msgAlert={this.msgAlert} user={user} match={match}
            />
          )} />
          <AuthenticatedRoute user={user} exact path='/cards/:id/comments/:id/edit' render={({ match }) => (
            <CommentEdit
              msgAlert={this.msgAlert} user={user} match={match}
            />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
