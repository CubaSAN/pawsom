import React, { Component } from 'react'
import autoBind from 'react-autobind'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap'
import FaCamera from 'react-icons/lib/fa/camera'
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

  resetForm() {
    this.setState({
      text: '',
      images: null,
      сommentsAllowed: false,
      isValid: false
    })
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

    if (text === '') return

    const { user } = this.props
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
        this.onSuccess()
      })
  }

  onSuccess() {
    this.props.onSuccess()
    this.resetForm()
  }

  onAllowCommentsChange(evt) {
    const { checked } = evt.target

    this.setState({
      сommentsAllowed: checked,
    })
  }

  render () {
    return (
      <div className={CN}>
        <form onSubmit={this.submitNewPost}>
          <FormGroup 
            className={`${CN}__formgroup`}
            controlId='newPost'
          >
            <FormControl
              className={`${CN}__textarea`}
              componentClass='textarea' 
              placeholder='Add new post...'
              onChange={this.onPostContantChange} 
              value={this.state.text} />
          </FormGroup>

          <FormGroup className={`${CN}__formgroup ${CN}__formgroup--controls`}>
            <Checkbox
              className={`${CN}__checkbox`}
              inline
              onChange={this.onAllowCommentsChange}>
              Comments Allowed
            </Checkbox>

            <div>
              <FaCamera 
                className={`${CN}__upload-icon`}
              />
              <Button
                className={`${CN}__submit`}
                type="submit">
                Submit
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }
}
