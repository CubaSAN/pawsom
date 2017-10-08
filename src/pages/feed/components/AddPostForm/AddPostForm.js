import React, { Component } from 'react'
import autoBind from 'react-autobind'
import PropTypes from 'prop-types'
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap'
import agent from '../../../../agent'
import './AddPostForm.scss'

const CN = 'add-post-form'

export class AddPostForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onSuccess: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      images: null,
      сommentsAllowed: false,
      isValid: false
    }

    autoBind(this)
  }

  onPostContantChange(evt) {
    evt.preventDefault()

    const { value } = evt.target

    this.setState({
      text: value
    })
  }

  submitNewPost(evt) {
    evt.preventDefault()

    const { user, onSuccess } = this.props
    const { text, сommentsAllowed } = this.state

    const post = {
      postedBy: user.id,
      text,
      сommentsAllowed,
      url: []
    }

    agent
      .Posts
      .addPost(post, user.token)
      .then(() => {
        onSuccess()
      })
  }

  render () {
    return (
      <div className={CN}>
        <form onSubmit={this.submitNewPost}>
          <FormGroup controlId='newPost'>
            <ControlLabel>Post Body</ControlLabel>
            <FormControl
              className={`${CN}__textarea`}
              componentClass='textarea' 
              placeholder='Post Content ...'
              onBlur={this.onPostContantChange} />
          </FormGroup>

          <FormGroup>
            <Checkbox inline>
              Comments Allowed
            </Checkbox>
          </FormGroup>

          <Button
            className={`${CN}__submit`}
            type="submit">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}
