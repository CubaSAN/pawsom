import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './FeedPage.scss'
import Post from './components/Post'
import { AddPostForm } from './components/AddPostForm'

const CN = 'feed-page'

export class FeedPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    user: PropTypes.object,
    changeRoute: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      postsPage: 0,
      posts: []
    }

    autoBind(this)
  }

  componentWillMount() {
    const { user } = this.props

    if (user.token && user.id) {
      agent.Posts.all(user.id, this.state.postsPage, user.token).then((posts) => {
        this.setState({
          posts
        })
      })
    }
  }

  renderPosts() {
    const { posts } = this.state
    if(posts.length) {
      return this.state.posts.map((post) =>
        <Post
          className={`${CN}__post`}
          key={post.id}
          post={post}
        />
      )
    } else {
      return (
        <div className={`${CN}__post-placeholder`}>
          <h2>There aren't any posts yet, please add one</h2>
        </div>
      )
    }
  }

  renderAddPostForm() {
    const { user } = this.props

    return (
      <AddPostForm
        user={user} 
        onSuccess={this.redirectToInitialState}
      />
    )
  }

  redirectToInitialState() {
    const { changeRoute } = this.props

    changeRoute('/')
  }

  render () {
    const { lat, lng } = this.props

    return (
      <div className={`${CN}__background`}>
        <PageLayout className={CN}
          isPageAvailable={lat && lng}>
          <Row>
            <Col xs={12}
              md={8}
              mdOffset={2}>
              {this.renderAddPostForm()}
              {this.renderPosts()}
            </Col>

            <Col className={`${CN}__sidebar`}
              md={3}
              xs={12}>
            </Col>
          </Row>
        </PageLayout>
      </div>
    )
  }
}
