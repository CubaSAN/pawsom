import React, { Component } from 'react'
import autoBind from 'react-autobind'
import PropTypes from 'prop-types'
import { FormControl, Checkbox } from 'react-bootstrap'
import { FormGroup, Button } from 'reactstrap'
import FaCamera from 'react-icons/lib/fa/camera'
import agent from '../../../../agent'
import { FileUploaderContainer } from '../../../../shared/components/FileUploader'
import './AddPostForm.scss'
import { FormattedMessage } from 'react-intl'

import { messages } from '../../../../localization'

const CN = 'add-post-form'

export class AddPostForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onSuccess: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired
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
      isValid: false,
      url: []
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

    const { user } = this.props
    const { text, сommentsAllowed, url } = this.state

    if (text === '') return

    const post = {
      postedBy: user.id,
      text,
      сommentsAllowed,
      url
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

  onUpload(urls) {
    this.setState({ url: urls })
  }

  render () {
    const {locale} = this.props

    return (
      <div className={CN}>
        <form onSubmit={this.submitNewPost}>
          <FormGroup
            className={`${CN}__formgroup`}
          >
            <FormControl
              className={`${CN}__textarea`}
              componentClass='textarea'
              placeholder={messages[locale].feed.add.textPlaceholder}
              onChange={this.onPostContantChange}
              value={this.state.text} />
          </FormGroup>

          <FormGroup className={`${CN}__formgroup ${CN}__formgroup--controls`}>
            <Checkbox
              className={`${CN}__checkbox`}
              inline
              onChange={this.onAllowCommentsChange}>
              <FormattedMessage id={'feed.add.comAllowed'} />
            </Checkbox>

            <div>
              <FaCamera
                className={`${CN}__upload-icon`}
              />
              <Button
                className={`${CN}__submit`}
                type="submit">
                <FormattedMessage id='submit' />
              </Button>
            </div>
          </FormGroup>
        </form>
        <FileUploaderContainer onUpload={this.onUpload} />
      </div>
    )
  }
}
