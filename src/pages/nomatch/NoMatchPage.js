import React from 'react'
import { LandingLayout } from '../../shared/components/LandingLayout'
import { Container, Col, Row } from 'reactstrap'
import './NoMatchPage.scss'

const CN = 'no-match-page'

export const NoMatchPage = () => {
  return (
    <LandingLayout>
      <Container className={CN}>
        <Row>
          <Col>
            <div className={`${CN}__title`}>404: Nothing found on your request</div>
          </Col>
        </Row>
      </Container>
    </LandingLayout>
  )
}
