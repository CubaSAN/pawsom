import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Button,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { Link } from 'react-router-dom'
import './Header.scss'

const CN = 'main-header';

export class Header extends Component {
  render () {
    return (
      <Container fluid>
        <Row className={CN}>
          <Container>
            <Navbar>
              <div className={`${CN}__logo`}>
                <Link to='/' className={`${CN}__homelink`}>Pawsom</Link>
              </div>

              <Nav className={`${CN}__navigation`}>
                <NavItem>
                  <Link to='/search' className={`${CN}__homenav`}>
                    Search Pet
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to='/accommodation' className={`${CN}__homenav`}>
                    Accommodation
                  </Link>
                </NavItem>
                <NavItem className='login'>
                  <Link to='/login' className={`${CN}__homenav`}>
                    Login
                  </Link>
                </NavItem>
              </Nav>
            </Navbar>
          </Container>
        </Row>
      </Container>
    )
  }
}
