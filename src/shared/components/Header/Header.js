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
import { LOCALE } from '../../../utils'
import './Header.scss'

const CN = 'main-header'

export class Header extends Component {
  static propTypes = {
    languages: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func
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
                <div>
                  {this.renderLanguageSelector()}
                </div>
              </Nav>
            </Navbar>
          </Container>
        </Row>
      </Container>
    )
  }
}
