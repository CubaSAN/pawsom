import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
// import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import moment from 'moment'
// import FaCommentO from 'react-icons/lib/fa/comments-o'
// import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import { PageLayout } from '../../shared/components/PageLayout'
// import Comment from './components/Comment'
// import AddCommentForm from './components/AddCommentForm'
import agent from '../../agent'
import './PostPage.scss'

const CN = 'post-page'

export class PublicPostPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null
    }
  }

  componentWillMount() {
    const token = null
    const id = this.props.computedMatch.params.id
    agent.Posts.byId(id, token).then((post) => {
      this.setState({
        post
      })
    })
  }

  renderImages(imagesUrl) {
    if (!imagesUrl.length) return null

    if (imagesUrl.length < 4) {
      const imageUrl = imagesUrl[0]
      return (
        <div className={`${CN}__content-images`}>
          <div className='big-img-container'>
            <img
              src={imageUrl}
              alt=''
            />
          </div>
        </div>
      )
    }
    return (
      <div className={`${CN}__content-images`}>
        <div className='big-img-container'>
          <img
            src={imagesUrl[0]}
            alt='' />
        </div>
        <div className='flex-wrapper'>
          {
            imagesUrl.slice(1, 4).map(imageUrl => {
              return (
                <div className='small-img-container'>
                  <img
                    src={imageUrl}
                    alt='' />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  // renderLikes(number) {
  //   return (
  //     <div>
  //       {number > 0 && number} Like{number > 1 && 's'}
  //       <FaThumbsOUp className={`${CN}__social-icon`} />
  //     </div>
  //   )
  // }

  // renderCommentCount(number) {
  //   return (
  //     <div>
  //       {number > 0 && number} Comment{number > 1 && 's'}
  //       <FaCommentO className={`${CN}__social-icon`} />
  //     </div>
  //   )
  // }

  renderPost() {
    const { postedPersonString, postedPersonName, created, text } = this.state.post
    const imagesUrl = this.state.post.url
    // const likes = this.state.post.reactions
    const local = moment.utc(created).local().toDate()

    return (
      <div className={`${CN}__post-wrapper`}>
        <div className={`${CN}__user`}>
          <div className={`${CN}__user-image`}>
            <img src={postedPersonString} alt="User" />
          </div>
          <div className={`${CN}__user-info`}>
            <div className={`${CN}__user-info-name`}>{postedPersonName}</div>
            <div className={`${CN}__user-info-created`}>
              <TimeAgo date={local} />
            </div>
          </div>
        </div>

        <div className={`${CN}__content`}>
          <p className={`${CN}__content-text`}>{text}</p>
          {this.renderImages(imagesUrl)}
        </div>
      </div>
    )
  }

  render () {
    const { lat, lng } = this.props

    return (
      <div className={`${CN}__background`}>
        <PageLayout className={CN}
          isPageAvailable={lat && lng}>
          <Col md={9}>
            {this.state.post && this.renderPost()}
          </Col>

          <Col md={3}>
          </Col>
        </PageLayout>
      </div>
    )
  }
}
