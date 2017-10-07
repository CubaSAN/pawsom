import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import isObject from 'is-object'
import {
  Grid,
  Row,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Cookies from 'js-cookie'
import store from '../../../store'
import { LOCALE, USER } from '../../../utils'
import { push } from 'react-router-redux'
import { LinkContainer } from 'react-router-bootstrap';
import Flag from 'react-world-flags'
import './Header.scss'

const CN = 'main-header'

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    languages: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func,
    onAuthenticate: PropTypes.func,
    onAddUser: PropTypes.func,
    err: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)

    autoBind(this)
  }

  setLanguage(language) {
    const { onLanguageChange } = this.props

    return function() {
      if (onLanguageChange) {
        onLanguageChange(language)

        Cookies.set(LOCALE, language, { expires: 365 })
      }
    }
  }

  renderLanguageSelector() {
    const { languages, locale } = this.props

    const languageCode = {
      'en': 'us',
      'ru': 'ru',
      'uk': 'ua',
      'en-US': 'us',
    }

    const currentFlag = 
      <span>
        <span className={`${CN}__lang-selector-title`}>Language:</span>
        <Flag code={languageCode[locale]}
          height='16'
          width='24' />
      </span>

    return (
      <NavDropdown title={currentFlag}
        className={`${CN}__lang-selector`}
        id='lang-selector'
        pullRight>
        {
          languages.map((language, i) => {
            

            return (
              <MenuItem key={i}
                onClick={this.setLanguage(language)}>
                <Flag code={languageCode[language]}
                  height='16'
                  width='24'/> {language}
              </MenuItem>
            )
          })
        }
      </NavDropdown>
    )
  }

  logOut() {
    this.props.onAddUser(null)

    Cookies.remove(USER)

    store.dispatch(push('/'))
  }

  render () {
    const { auth: { user }, err } = this.props
    const isAuthenticated = isObject(user)

    return (
      <Grid fluid>
        <Row className={CN}>
          <Navbar collapseOnSelect
            fixedTop>
            <Navbar.Header>
              <Navbar.Brand className={`${CN}__logo`}>
                <Link
                  className={`${CN}__homelink`}
                  to="/"
                >
                  Pawsom
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              {
                !err && isAuthenticated &&
                <Nav className={`${CN}__mainmenu`}>
                  <LinkContainer to='/search'>
                    <NavItem className={`${CN}__mainnav`}>
                      <FormattedMessage id='header.links.search' />
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to='/accommodation'>
                    <NavItem className={`${CN}__mainnav`}>
                      <FormattedMessage id='header.links.accommodation' />
                    </NavItem>
                  </LinkContainer>
                </Nav>
              }

              {
                !isAuthenticated &&
                <div className={`${CN}__mainmenu-push`}></div>
              }

              <Nav pullRight
                className={`${CN}__mainmenu-user`}>
                {
                  !isAuthenticated &&
                  <LinkContainer to='/login'>
                    <NavItem className={`${CN}__mainnav ${CN}__mainnav--login`}>
                      <FormattedMessage id='header.links.login' />
                    </NavItem>
                  </LinkContainer>
                }
                {this.renderLanguageSelector()}
              </Nav>

              {
                isAuthenticated && user &&
                <Navbar.Text pullRight
                  className={`${CN}__links`}>
                  <span className={`${CN}__avatar`}>
                    <img src={user.avatar}
                      alt={user.name} />
                  </span>
                  <span className={`${CN}__links ${CN}__links--user-name`}>{`${user.name} | `}</span>
                  <span onClick={this.logOut}
                    className={`${CN}__links ${CN}__links--log-out`}>Log out</span>
                </Navbar.Text>
              }
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Grid>
    )
  }
}
