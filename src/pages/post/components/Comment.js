import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

const Comment = (props) => {
  const {
    created,
    message,
    posterName,
    posterPick
  } = props.comment

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user-container">
          <div className="post-user-image">
            <img src={posterPick} alt="User" />
          </div>
          <div className="post-user">
            <div className="post-user-name">{posterName}</div>
            <div className="post-user-created">
              <TimeAgo date={created} />
            </div>
          </div>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{message}</p>
        read more ...
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
};

export default Comment
