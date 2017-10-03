import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FacebookLogin } from 'react-facebook-login-component'
import { LandingLayout } from '../../shared/components/LandingLayout'
import { WithGeolocation } from '../../shared/components/WithGeolocation'
import { Container, Col } from 'reactstrap'
import autoBind from 'react-autobind'
import agent from '../../agent'
import Cookies from 'js-cookie'
import { USER } from '../../utils'
import store from '../../store'
import { push } from 'react-router-redux'
import './LoginPage.scss'

const CN = 'login-page'

const socialsConfig = {
  facebookButton: {
    socialId: '559925357546946',
    scope:'public_profile',
    fields:'id, email, name, picture',
    version:'v2.8',
    className:'btn lg fb',
    buttonText:'Facebook'
  }
}

export class LoginPage extends Component {
  static propTypes = {
    onAddUser: PropTypes.func.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  constructor(props) {
    super(props)

    autoBind(this)
  }

  onFacebookAuthenticate(user) {
    if (user) {
      this.props.onAddUser(user)
    }

    Cookies.set(USER, JSON.stringify(user), { expires: 365 })

    store.dispatch(push('/feed'))
  }

  onFacebookAuthenticateFail() {
    Cookies.remove(USER)

    store.dispatch(push('/login'))
  }

  responseFacebook(user) {
    if (typeof user === 'object' && user.accessToken) {
      agent
        .Auth
        .authorize(user.accessToken, 'facebook')
        .then(({ name, id, email, pick, access_token, token_type, expires_in }) => {
          this.onFacebookAuthenticate({
            name,
            id,
            email,
            avatar: pick,
            token: access_token,
            tokenType: token_type
          }, expires_in)
        })
        .catch((err) => {
          this.onFacebookAuthenticateFail(err)
        })
    }
  }

  render () {
    const { facebookButton } = socialsConfig
    const { lat, lng } = this.props

    return (
      <WithGeolocation isPageAvailable={!!lat && !!lng}>
        <LandingLayout>
          <div className={CN}>
            <Container>
              <Col className={`${CN}__social-block`}>
                <div className={`${CN}__social-block-title`}>
                  Log in with one of social neetwork
                </div>

                <FacebookLogin
                  socialId={facebookButton.socialId}
                  scope={facebookButton.scope}
                  responseHandler={this.responseFacebook}
                  xfbml
                  fields={facebookButton.fields}
                  version={facebookButton.version}
                  className={facebookButton.className}
                  buttonText={facebookButton.buttonText}
                />

              </Col>
            </Container>
          </div>
        </LandingLayout>
      </WithGeolocation>
    )
  }
}
