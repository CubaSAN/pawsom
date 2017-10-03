import React from 'react'
import { LandingLayout } from '../../shared/components/LandingLayout'
import { Container, Col, Row } from 'reactstrap'
import './NoGeoPage.scss'

const CN = 'no-geo-page'

export const NoGeoPage = () => {
  return (
    <LandingLayout>
      <Container className={CN}>
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
      </Container>
    </LandingLayout>
  )
}
