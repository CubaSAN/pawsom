import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

const CN = 'comment'

const Comment = (props) => {
  const {
    created,
    message,
    posterName,
    posterPick
  } = props.comment

  return (
    <div className={`${CN}`}>
      <div className={`${CN}__user`}>
        <div className={`${CN}__user-image`}>
          <img src={posterPick} alt="User" />
        </div>
        <div className={`${CN}__user-info`}>
          <div className={`${CN}__user-name`}>{posterName}</div>
          <div className={`${CN}__created`}>
            <TimeAgo date={created} />
          </div>
        </div>
      </div>
      <div className={`${CN}__content`}>
        <p className={`${CN}__ccontent-text`}>{message}</p>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
};

export default Comment
