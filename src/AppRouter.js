import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { HomePage } from './pages/home'
import { NoMatchPage } from './pages/nomatch'

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route component={NoMatchPage} />
    </Switch>
  </Router>
)
