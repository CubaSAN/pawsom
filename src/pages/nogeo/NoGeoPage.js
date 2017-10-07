import React from 'react'
import { LandingLayout } from '../../shared/components/LandingLayout'
import { Grid, Col, Row } from 'react-bootstrap'
import './NoGeoPage.scss'

const CN = 'no-geo-page'

export const NoGeoPage = () => {
  return (
    <LandingLayout>
      <Grid className={CN}>
        <Row>
          <Col>
            <div className={`${CN}__title`}>
              Please allow location in your browser and refresh browser
            </div>
            <p>By default, your browser will have geolocation enabled.
              If you have disabled geolocation in your browser, it's easy to enable it again.
            </p>
          </Col>
        </Row>
      </Grid>
    </LandingLayout>
  )
}
