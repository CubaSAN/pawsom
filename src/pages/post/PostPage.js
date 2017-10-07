import React, { Component } from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './PostPage.scss'

const CN = 'post-page__post'

export class PostPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      post: null
    }
  }

  componentWillMount() {
    const token = this.props.token
    const id = this.props.computedMatch.params.id

    agent.Posts.byId(id, token).then((post) => {
      this.setState({
        post
      })
    })
  }

  renderPost() {
    const post = this.state.post

    return (
      post ?
      <div className={`${CN}`}>
        <div className={`${CN}-user`}>
          <div className={`${CN}-user-image`}>
             <img src={post.postedPersonString} alt="User"/>
          </div>
          <div className={`${CN}-user-info`}>
            <div className={`${CN}-user-info-name`}>{post.postedPersonName}</div>
            <div className={`${CN}-user-info-created`}>
              <TimeAgo date={post.created} />
            </div>
          </div>
        </div>
        <div className={`${CN}-content`}>
          {post.url.length && <img className={`${CN}-content-images`} src="https://static.pexels.com/photos/59523/pexels-photo-59523.jpeg" alt="" />}
          <p className={`${CN}-content-text`}>{post.text}</p>
        </div>
        <div onClick={() => this.deletePost()}>Delete Post</div>
      </div>
      :
      <div>post load...</div>
    )
  }

  render () {
    const { lat, lng } = this.props

    return (
      <PageLayout className={CN}
        isPageAvailable={lat && lng}>
        <Col md={9}>
          {this.renderPost()}
        </Col>

        <Col md={3}>
        </Col>
      </PageLayout>
    )
  }
}
