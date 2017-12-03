import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { FormControl } from 'react-bootstrap'
import { FormGroup, Button } from 'reactstrap'
import agent from '../../../agent'

const CN = 'add-comment'

class AddCommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      images: null
    }

    autoBind(this)
  }

  onCommentContantChange(evt) {
    evt.preventDefault()

    const { value } = evt.target

    this.setState({
      text: value
    })
  }

  submitNewPost(evt) {
    evt.preventDefault()

    const token = this.props.token
    const id = this.props.postId
    const { text } = this.state
    if (text === '') return

    const body = {
      postId: id,
      postedBy: this.props.userId,
      message: text,
      url: []
    }

    agent.Comments.addComment(body, token).then((error) => {
      if (!error) {
        agent.Comments.getComments(id, 0, token).then((comments) => {
          this.props.addComment(comments)
        })

        this.setState({
          text: ''
        })
      }

      console.error(error);
    })
  }

  render() {
    return (
      <div className={`${CN}`}>
        <form onSubmit={this.submitNewPost}>
          <FormGroup
            className={`${CN}__formgroup`}
          >
            <FormControl
              className={`${CN}__textarea`}
              componentClass='textarea'
              placeholder='Add new comment...'
              onChange={this.onCommentContantChange}
              value={this.state.text} />
          </FormGroup>

          <FormGroup className={`${CN}__formgroup ${CN}__formgroup--controls`}>
            <div>
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

export default AddCommentForm
