import React from 'react'
import { LandingLayout } from '../../shared/components/LandingLayout'
import { Grid, Col, Row } from 'react-bootstrap'
import './NoMatchPage.scss'

const CN = 'no-match-page'

export const NoMatchPage = () => {
  return (
    <LandingLayout>
      <Grid className={CN}>
        <Row>
          <Col>
            <div className={`${CN}__title`}>404: Nothing found on your request</div>
          </Col>
        </Row>
      </Grid>
    </LandingLayout>
  )
}
