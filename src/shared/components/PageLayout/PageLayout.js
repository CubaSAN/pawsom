import React from 'react'
import { Container, Row } from 'reactstrap';
import { HeaderContainer } from '../Header'
import './PageLayout.scss'

const CN = 'page-layout'

export const PageLayout = (props) => {
  return (
    <div className={CN}>
      <Container fluid>
        <Row>
          <HeaderContainer />
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
