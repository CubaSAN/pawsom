import React, { Component } from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './PostPage.scss'

const CN = 'post-page'

export class PostPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  constructor(props) {
    super(props)
    console.log('yo');
  }

  render () {
    const { lat, lng } = this.props

    return (
      <PageLayout className={CN}
        isPageAvailable={lat && lng}>
        <h2>Post Page</h2>
      </PageLayout>
    )
  }
}
