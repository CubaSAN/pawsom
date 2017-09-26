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
import { FormattedMessage } from 'react-intl'
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
                    <FormattedMessage id="header.links.search" />
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to='/accommodation' className={`${CN}__homenav`}>
                    <FormattedMessage id="header.links.accommodation" />
                  </Link>
                </NavItem>
                <NavItem className='login'>
                  <Link to='/login' className={`${CN}__homenav`}>
                    <FormattedMessage id="header.links.login" />
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
