import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import TimeAgo from 'react-timeago'
import FaCommentO from 'react-icons/lib/fa/comments-o'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import { ImageGallery } from '../../../shared/components/ImageGallery'
import agent from '../../../agent'
import { FormattedMessage } from 'react-intl'

const CN = 'feed-page__post-wrapper'

export class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    autoBind(this)
  }

  renderText() {
    const { text, id } = this.props.post

    return (
      (text.length > 200) ?
        <p>
          {`${text.slice(0, 200)}...`}
          <Link
            to={`/post/${id}`}
            className={`${CN}-content-text-read-more`}
          >
            <FormattedMessage id="feed.readmore" />
          </Link>
        </p>
        :
        <p>{text}</p>
    )
  }

  onImagesGalleryClose() {

  }

  renderImages(imagesUrl) {
    if (!imagesUrl.length) return null

    return (
      <ImageGallery images={imagesUrl} />
    )
  }

  renderLikes(number) {
    return (
      <div onClick={this.setReaction}>
        {number > 0 && number} <FormattedMessage id="feed.like"/>
        <FaThumbsOUp className={`${CN}-content-social-icon`} />
      </div>
    )
  }

  setReaction() {
    const { token, id: userId } = this.props
    const { id } = this.props.post

    const body = {
      postId: id,
      postedBy: userId
    }

    agent.Likes.setReaction(body, token).then((likes) => {
      this.props.changePostlikes(id, likes)
    })
  }

  renderCommentCount(number) {
    return (
      <div>
        {number > 0 && number} <FormattedMessage id="feed.comments"/>
        <FaCommentO className={`${CN}-content-social-icon`} />
      </div>
    )
  }

  render() {
    const {
      id,
      postedPersonName,
      created,
      text,
      commentCount,
      postedPersonString,
      url,
      reactions
    } = this.props.post

    return (
      <div className={`${CN}`}>
        <div className={`${CN}-user`}>
          <div className={`${CN}-user-image`}>
            <img
              src={postedPersonString}
              alt={postedPersonName}
            />
          </div>
          <div className={`${CN}-user-info`}>
            <div className={`${CN}-user-info-name`}>{postedPersonName}</div>
            <div className={`${CN}-user-info-created`}>
              <TimeAgo date={created} />
            </div>
          </div>
        </div>
        <div className={`${CN}-content`}>
          <div className={`${CN}-content-text`}>
            { text && this.renderText() }
          </div>
          <div className={`${CN}-content-images`}>
            {this.renderImages(url)}
          </div>
          <div className={`${CN}-content-social`}>
            <span className={`${CN}-content-social-text`}>
              {this.renderLikes(reactions)}
            </span>
            <span> | </span>
            {/* <span className={`${CN}-content-social-text`}>Share</span>
            <span> | </span> */}
            <Link
              to={`/post/${id}`}
              className={`${CN}-content-social-text`}
            >
              {this.renderCommentCount(commentCount)}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
