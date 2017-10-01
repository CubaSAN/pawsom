import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FeedPage } from './FeedPage'

const mapStateToProps = state => {
  const { id, token } = state.auth.user
  return {
    id,
    token
  }
};

export const FeedPageContainer = connect(
  mapStateToProps
)(FeedPage)
