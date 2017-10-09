import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import FaCommentO from 'react-icons/lib/fa/comments-o'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
// import CommentBox from './CommentBox';
//import ImageGrid from './../../../assets/libs/photo-grid';
// import agent from './../../../agent'
const CN = 'feed-page__post-wrapper'

const Post = props => {
  const { id, postedPersonName, created, text, commentCount } = props.post
  const userImage = props.post.postedPersonString
  const imagesUrl = props.post.url
  const likes = props.post.reactions

  const renderImages = (imagesUrl) => {
    if (!imagesUrl.length) return null

    if (imagesUrl.length < 4) {
      const imageUrl = imagesUrl[0]
      return (
        <div className={`${CN}-content-images-container`}>
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
      <div className={`${CN}-content-images-container`}>
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

  const renderText = () => {
    return text.length > 200 ? `${text.slice(0, 200)}...` : text
  }

  const renderCommentCount = number =>
    <div>
      {number > 0 && number} Comment{number > 1 && 's'}
      <FaCommentO className={`${CN}-content-social-icon`} />
    </div>

  const renderLikes = number =>
    <div>
      {number > 0 && number} Like{number > 1 && 's'}
      <FaThumbsOUp className={`${CN}-content-social-icon`} />
    </div>

  return (
    <div className={`${CN}`}>
      <div className={`${CN}-user`}>
        <div className={`${CN}-user-image`}>
          <img src={userImage}
            alt='User' />
        </div>
        <div className={`${CN}-user-info`}>
          <div className={`${CN}-user-info-name`}>{postedPersonName}</div>
          <div className={`${CN}-user-info-created`}>
            <TimeAgo date={created} />
          </div>
        </div>
      </div>

      <div className={`${CN}-content`}>
        <p className={`${CN}-content-text`}>
          {renderText()}
          <span className={`${CN}-content-text-read-more`}>read more</span>
        </p>

        <div className={`${CN}-content-images`}>
          {renderImages(imagesUrl)}
        </div>

        <div className={`${CN}-content-social`}>
          <span className={`${CN}-content-social-text`}>
            { renderLikes(likes) }
          </span>
          <span> | </span>
          <span className={`${CN}-content-social-text`}>Share</span>
          <span> | </span>
          <Link
            to={`/post/${id}`}
            className={`${CN}-content-social-text`}
          >
            { renderCommentCount(commentCount) }
          </Link>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post
