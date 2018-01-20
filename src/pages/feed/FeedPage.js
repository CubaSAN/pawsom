import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
import { FormattedMessage } from 'react-intl'


const CN = 'feed-page'

export class FeedPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    user: PropTypes.object,
    locale: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      postsPage: 0,
      posts: [],
      postsReady: false,
      prevDisabled: '',
      nextDisabled: ''
    }

    autoBind(this)
  }

  componentWillMount() {
    let id = +this.props.computedMatch.params.id
    this.setState({
      postsPage: id,
      prevDisabled: id ? '' : 'disabled',
    }, () => {
      this.updatePosts()
    })
  }

  updatePosts() {
    const { user } = this.props
    if (user.token && user.id) {
      agent.Posts.all(user.id, this.state.postsPage , user.token).then((posts) => {
        this.setState({
          posts,
          postsReady: true,
          nextDisabled: posts.length < 20 ? 'disabled' : ''
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

    if (posts.length) {
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
    const { user, locale } = this.props

    return (
      <AddPostForm
        user={user}
        onSuccess={this.onPostAddSuccess}
        locale={locale}
      />
    )
  }

  onPostAddSuccess() {
    this.updatePosts()
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  changePosts(event, page) {
    this.scrollToTop()
    let newPostPage = this.state.postsPage + page
    if (newPostPage < 0 || (this.state.posts.length < 20 && page !== -1)) {
      event.preventDefault()
    } else {
      this.setState({
        postsPage: newPostPage,
        prevDisabled: newPostPage ? '' : 'disabled'
      }, () => {
        this.updatePosts()
      })
    }
  }

  renderPagination() {
    return (
      <div className={`${CN}__pagination`}>
        <Link
          to={`/feed/${this.state.postsPage - 1}`}
          className={`${CN}__pagination-item ${this.state.prevDisabled}`}
          onClick={(e) => this.changePosts(e, -1)}
        >
          <span><FormattedMessage id='previous'/></span>
        </Link>
        <span> | </span>
        <span className={`${CN}__pagination-number`}>{this.state.postsPage + 1}</span>
        <span> | </span>
        <Link
          to={`/feed/${this.state.postsPage + 1}`}
          className={`${CN}__pagination-item ${this.state.nextDisabled}`}
          onClick={(e) => this.changePosts(e, 1)}
        >
          <span><FormattedMessage id='next'/></span>
        </Link>
      </div>
    )
  }

  render () {
    const { lat, lng } = this.props
    const postsReady = this.state.postsReady
    return (
      <div className={`${CN}__background`}>
        <PageLayout className={CN}
          isPageAvailable={lat && lng && postsReady}>
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
