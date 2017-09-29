import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import {
  Container,
  Row,
  Navbar,
  Nav,
  NavItem,
  Input
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Cookies from 'js-cookie'
import store from '../../../store'
import { LOCALE, USER } from '../../../utils'
import { push } from 'react-router-redux'
import './Header.scss'

const CN = 'main-header'

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    languages: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func,
    onAuthenticate: PropTypes.func,
    onAddUser: PropTypes.func
  }

  constructor(props) {
    super(props)

    autoBind(this)
  }

  changeLanguage(evt) {
    const { onLanguageChange } = this.props
    evt.preventDefault()

    const { value } = evt.target

    if (onLanguageChange) {
      onLanguageChange(value)

      Cookies.set(LOCALE, value, { expires: 365 })
    }
  }

  renderLanguageSelector() {
    const { languages, locale } = this.props

    return (
      <Input
        className={`${CN}__lang-selector`}
        type='select'
        onChange={this.changeLanguage}
        value={locale === 'en-US' ? 'en' : locale}
      >
        {
          languages.map((language, i) => (
            <option
              key={i}
              value={language}
            >
              {language}
            </option>
          ))
        }
      </Input>
    )
  }

  logOut() {
    this.props.onAuthenticate(false)
    this.props.onAddUser(null)

    Cookies.remove(USER)

    store.dispatch(push('/'))
  }

  render () {
    const { isAuthenticated, user } = this.props.auth

    return (
      <Container fluid>
        <Row className={CN}>
          <Container>
            <Navbar>
              <div className={`${CN}__logo`}>
                <Link to='/' className={`${CN}__homelink`}>Pawsom</Link>
              </div>

              <Nav className={`${CN}__navigation`}>
                {
                  isAuthenticated &&
                  <NavItem>
                    <Link to='/search' className={`${CN}__homenav`}>
                      <FormattedMessage id="header.links.search" />
                    </Link>
                  </NavItem>
                }

                {
                  isAuthenticated &&
                  <NavItem>
                    <Link to='/accommodation' className={`${CN}__homenav`}>
                      <FormattedMessage id="header.links.accommodation" />
                    </Link>
                  </NavItem>
                }

                {
                  !isAuthenticated &&
                  <NavItem className='login'>
                    <Link to='/login' className={`${CN}__homenav`}>
                      <FormattedMessage id="header.links.login" />
                    </Link>
                  </NavItem>
                }
              </Nav>

              {
                isAuthenticated && user &&
                <div>
                  <span>{user.name}</span>
                  {' | '}
                  <span onClick={this.logOut}>Log out</span>
                </div>
              }

              <div>
                {this.renderLanguageSelector()}
              </div>
            </Navbar>

          </Container>
        </Row>
      </Container>
    )
  }
}
