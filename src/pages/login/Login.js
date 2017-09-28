import React, { Component } from 'react'
import { FacebookLogin } from 'react-facebook-login-component'
import { PageLayout } from '../../shared/components/PageLayout'
import autoBind from 'react-autobind'
import agent from '../../agent'
import Cookies from 'js-cookie'
import { USER } from '../../utils'
import store from '../../store'
import './Login.scss'

const CN = 'login-page'

const socialsConfig = {
  facebookButton: {
    socialId: '559925357546946',
    scope:'public_profile',
    fields:'id',
    version:'v2.8',
    className:'btn lg fb',
    buttonText:'Facebook'
  }
}

export class Login extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  onFacebookAuthenticate(user, expires) {
    Cookies.set(USER, JSON.stringify(user), { expires: 365 })
  }

  onFacebookAuthenticateFail(err) {

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
    return (
      <PageLayout>
        <div className={CN}>
          <div>
            <div className={`${CN}__social-block-title}`}>
              Log in with one of social neetwork
            </div>

            <ul>
              <li>
                <FacebookLogin
                    socialId={facebookButton.socialId}
                    scope={facebookButton.scope}
                    responseHandler={this.responseFacebook}
                    xfbml={true}
                    fields={facebookButton.fields}
                    version={facebookButton.version}
                    className={facebookButton.className}
                    buttonText={facebookButton.buttonText}
                />
              </li>
            </ul>
          </div>
        </div>
      </PageLayout>
    )
  }
}
