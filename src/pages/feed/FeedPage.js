import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './FeedPage.scss'
import Post from './components/Post'

const CN = 'feed-page'

export class FeedPage extends Component {
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
    return (
      <PageLayout className={CN}>
        <Col md={9}>
          {this.renderPost()}
        </Col>

        <Col className={`${CN}__sidebar`} md={3}>
        </Col>
      </PageLayout>
    )
  }
}
