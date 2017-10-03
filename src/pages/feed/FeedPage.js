import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PageLayout } from '../../shared/components/PageLayout'
import './FeedPage.scss'

export class FeedPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  render () {
    const { lat, lng } = this.props

    return (
      <PageLayout isPageAvailable={lat && lng}>
        <h2>Feed Page</h2>
      </PageLayout>
    )
  }
}
