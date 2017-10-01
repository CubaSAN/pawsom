import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './FeedPage.scss'
import Post from './components/Post'

const CN = 'feed-page'

export class FeedPage extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      postsPage: 0,
      posts: []
    }
  }

  componentWillMount() {
    const {token, id} = this.props;
    if (token && id) {
      agent.Posts.all(id, this.state.postsPage, token).then((posts) => {
        this.setState({
          posts
        })
      })
    }
  }

  renderPost() {
    if(this.state.posts.length) {
      return this.state.posts.map((post) =>
        <Post
          key={post.id}
          post={post}
        />
      )
    } else {
      return (
        <div className={`${CN}__post-placeholder`}>
          <h2>No one added a post yet</h2>
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
