import React, { Component } from 'react'
import { AppRouter } from './router/AppRouter'

import './shared/scss/main.scss'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: true
    }
  }

  render () {
    return (
      <AppRouter {...this.state} />
    )
  }
}
