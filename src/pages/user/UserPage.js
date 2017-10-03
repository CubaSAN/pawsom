import React, { Component } from 'react'
import { PageLayout } from '../../shared/components/PageLayout'
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from 'reactstrap'
import PropTypes from 'prop-types'
import agent from '../../agent'
import autoBind from 'react-autobind'
import Cookies from 'js-cookie'
import { USER } from '../../utils'
import './UserPage.scss'

const CN = 'user-page'

export class UserPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onAddUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    const user = props.user

    this.state = {
      name: user.name,
      phoneNumber: user.phone || '',
      city: 'Lviv',
      country: 'Ukraine',
      state: 'Lviv Oblast',
      profilePick: user.avatar,
      longitude: 24.008956,
      latitude: 49.843469,
      email: user.email || '',
      isoCountryCode: 'UA',
      id: user.id,
      token: user.token,
      tokenType: user.tokenType,
    }

    autoBind(this)
  }

  changeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  changeNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  sendForm() {
    const { user, onAddUser } = this.props

    const formData = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      city: this.state.city,
      country: this.state.country,
      state: this.state.state,
      profilePick: this.state.profilePick,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      email: this.state.email,
      isoCountryCode: this.state.isoCountryCode,
      id: this.state.id
    }

    agent
      .User
      .updateUser(formData, user.token)
      .then(() => {
        const user = {
          name: this.state.name,
          phone: this.state.phoneNumber,
          id: this.state.id,
          email: this.state.email,
          avatar: this.state.profilePick,
          token: this.state.token,
          tokenType: this.state.tokenType,
          isAdditionalInfoNeeded: false
        }

        onAddUser(user)

        Cookies.set(USER, JSON.stringify(user), { expires: 365 })
      })
  }

  render() {
    return (
      <PageLayout
        isPageAvailable
        className={CN}
      >
        <Container>
          <Row>
            <Col>
              <div className={`${CN}__title`}>Additional Info Needed</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}
              md={9}
              lg={6}>
              <Form>
                <FormGroup>
                  <Label for='name'>Name</Label>
                  <Input type='name'
                    name='name'
                    id='name'
                    value={this.state.name}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input type='email'
                    name='email'
                    id='email'
                    value={this.state.email}
                    onChange={this.changeEmail}/>
                </FormGroup>
                <FormGroup>
                  <Label for='phone'>Phone</Label>
                  <Input type='phone'
                    name='phone'
                    id='phone'
                    value={this.state.phoneNumber}
                    onChange={this.changeNumber}/>
                </FormGroup>
                <Button onClick={this.sendForm}>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </PageLayout>
    )
  }
}
