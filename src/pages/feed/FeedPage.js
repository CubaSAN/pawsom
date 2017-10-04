import React, { Component } from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './FeedPage.scss'
import Post from './components/Post'

const CN = 'feed-page'

export class FeedPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      postsPage: 0,
      posts: []
    }
  }

  componentWillMount() {
    const { token, id } = this.props;
    if (token && id) {
      agent.Posts.all(id, this.state.postsPage, token).then((posts) => {
        this.setState({
          posts
        })
      })
    }
  }

  renderPost() {
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

  render () {
    const { lat, lng } = this.props

    return (
      <PageLayout className={CN}
        isPageAvailable={lat && lng}>
        <Col md={9}>
          {this.renderPost()}
        </Col>

        <Col className={`${CN}__sidebar`}
          md={3}>
        </Col>
      </PageLayout>
    )
  }
}
