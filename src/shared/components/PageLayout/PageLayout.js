import React from 'react'
import { Container, Row } from 'reactstrap';
import { Header } from '../Header'
import './PageLayout.scss'

const CN = 'page-layout'

export const PageLayout = (props) => {
  return (
    <div className={CN}>
      <Container fluid>
        <Row>
          <Header />
        </Row>

        <Container>
          <Row className={`${CN}__content`}>
            {props.children}
          </Row>
        </Container>
      </Container>
    </div>
  )
}
