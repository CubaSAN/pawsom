import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
// import CommentBox from './CommentBox';
//import ImageGrid from './../../../assets/libs/photo-grid';
// import agent from './../../../agent'

const Post = props => {
  const { id, postedPersonName, created, text, commentCount } = props.post
  const userImage = props.post.postedPersonString
  const imagesUrl = props.post.url
  const likes = props.post.reactions

  const renderImages = (imagesUrl) => {
    if (imagesUrl.length <= 4) {
      return (
        <div className="post-images-container">
          <div className="big-img-container"><img src={imagesUrl[0]} alt="" /></div>
        </div>
      )
    }
    return (
      <div className="post-images-container extended">
        <div className="big-img-container"><img src={imagesUrl[0]} alt="" /></div>
        <div className="flex-wrapper">
          {
            imagesUrl.slice(1, 4).map(img => {
              return (
                <div className="small-img-container">
                  <img src={img} alt="" />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  const renderCommentCount = number =>
    <span>{number} Comment{number > 1 && 's'}</span>

  const renderLikes = number =>
    <span>{number > 0 && number} Like{number > 1 && 's'}</span>

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user-container">
          <div className="post-user-image">
            <img src={userImage} alt="User" />
          </div>
          <div className="post-user">
            <div className="post-user-name">{postedPersonName}</div>
            <div className="post-user-created">
              <TimeAgo date={created} />
            </div>
          </div>
        </div>
      </div>
      <div className="post-content">
        <div className="post-images">
          { imagesUrl.length && renderImages(imagesUrl) }
        </div>
        <p className="post-text">{text}</p>
        read more ...
        <div className="post-social">
          <span>
            { renderLikes(likes) }
          </span>
          <span> | </span>
          <span>Share</span>
          <span> | </span>
          <Link to={`/post/${id}`}>
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
