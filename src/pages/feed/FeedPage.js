import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './FeedPage.scss'

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
console.log('token', token);
    if (token && id) {
      agent.Posts.all(id, this.state.postsPage, token).then((posts) => {
        this.setState({
          posts
        })
        console.log('posts response', posts)
        console.log('posts', this.state.posts);
      })
    }
  }

  renderPost() {
    if(this.state.posts.length) {
      return (
        <h2>Feed Page</h2>
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
      <PageLayout>
        <Col md={9}>
          {this.renderPost()}
        </Col>

        <Col className={`${CN}__sidebar`} md={3}>
        </Col>
      </PageLayout>
    )
  }
}
