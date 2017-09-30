import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FeedPage } from './FeedPage'

const mapStateToProps = state => {
  return {
    token: state.auth.user.token,
    id: state.auth.user.id
  }
};

export const FeedPageContainer = connect(
  mapStateToProps
)(FeedPage)
