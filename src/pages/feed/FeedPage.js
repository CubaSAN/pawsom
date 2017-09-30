import React, { Component } from 'react'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './FeedPage.scss'

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

    agent.Posts.all(id, this.state.postsPage, token).then((posts) => {
      this.setState({
        posts
      })
      console.log('posts response', posts)
      console.log('posts', this.state.posts);
    })
  }

  render () {
    return (
      <PageLayout>
        <h2>Feed Page</h2>
      </PageLayout>
    )
  }
}
