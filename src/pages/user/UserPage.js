import React, { Component } from 'react'
import { PageLayout } from '../../shared/components/PageLayout'

const CN = 'user-page'

export class UserPage extends Component {
  render () {
    return (
      <PageLayout
        isPageAvailable
        className={CN}
      >
        Additional info needed
      </PageLayout>
    )
  }
}
