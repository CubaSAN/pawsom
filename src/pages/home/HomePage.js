import React from 'react'
import { Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap'
import { LandingLayout } from '../../shared/components/LandingLayout'

import './HomePage.css'

export const CN = 'home-page'

export const HomePage = () => {
  return (
    <LandingLayout>
      <Container fluid>
        <Row className={`${CN}__header`}>
          <Container>
            <Navbar>
              <NavbarBrand
                  className={`${CN}__logo`}
                  href="/">
                    Pawsom
              </NavbarBrand>
            </Navbar>
          </Container>
        </Row>
      </Container>
    </LandingLayout>
  )
}
