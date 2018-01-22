import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import moment from 'moment'

const CN = 'comment'

const Comment = (props) => {
  const {
    created,
    message,
    posterName,
    posterPick
  } = props.comment
  const local = moment.utc(created).local().toDate()

  return (
    <div className={`${CN}`}>
      <div className={`${CN}__user`}>
        <div className={`${CN}__user-image`}>
          <img src={posterPick} alt="User" />
        </div>
        <div className={`${CN}__user-info`}>
          <div className={`${CN}__user-name`}>{posterName}</div>
          <div className={`${CN}__created`}>
            <TimeAgo date={local} />
          </div>
        </div>
      </div>
      <div className={`${CN}__content`}>
        <p
          className={`${CN}__content-text`}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
};

export default Comment
