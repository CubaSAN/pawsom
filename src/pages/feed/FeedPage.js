import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left'
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right'
import { PageLayout } from '../../shared/components/PageLayout'
import agent from '../../agent'
import './FeedPage.scss'
import { Post } from './components/Post'
import { AddPostForm } from './components/AddPostForm'

const CN = 'feed-page'

export class FeedPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    user: PropTypes.object
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
    this.updatePosts()
  }

  updatePosts() {
    const { user } = this.props

    if (user.token && user.id) {
      agent.Posts.all(user.id, this.state.postsPage, user.token).then((posts) => {
        this.setState({
          posts
        })
      })
    }
  }

  changePostlikes(postId, likes) {
    const { posts } = this.state
    // let index = posts.findIndex((post) => post.id === postId)
    const changePost = posts.map(post => {
      if (post.id === postId) {
        post.reactions = likes
      }
      return post
    })

    this.setState({
      posts: changePost
    })
  }

  renderPosts() {
    const { posts } = this.state
    const { user } = this.props

    if(posts.length) {
      return this.state.posts.map((post) =>
        <Post
          className={`${CN}__post`}
          key={post.id}
          post={post}
          id={user.id}
          token={user.token}
          changePostlikes={this.changePostlikes}
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
        onSuccess={this.onPostAddSuccess}
      />
    )
  }

  onPostAddSuccess() {
    this.updatePosts()
  }

  renderPagination() {
    return (
      <div className={`${CN}__pagination`}>
        <div
          className={`${CN}__pagination-item`}
          onClick={() => this.changePage(-1)}
        >
          <FaAngleDoubleLeft className={`${CN}__pagination-icon`} />
          <span>Previous</span>
        </div>
        <span> | </span>
        <span className={`${CN}__pagination-number`}>{this.state.postsPage + 1}</span>
        <span> | </span>
        <div
          className={`${CN}__pagination-item`}
          onClick={() => this.changePage(1)}
        >
          <span>Next</span>
          <FaAngleDoubleRight className={`${CN}__pagination-icon`} />
        </div>
      </div>
    )
  }

  changePage(page) {

    this.setState({
      postsPage: this.state.postsPage + page
    })

    setTimeout(()=> {
      this.updatePosts()
    }, 0)
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
              {this.renderPagination()}
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
