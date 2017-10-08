import { connect } from 'react-redux'
import { FeedPage } from './FeedPage'
import { pushToHistory } from '../../actions'

const mapStateToProps = state => {
  const { navigator: { lat, lng }, auth} = state || {}

  return {
    lat,
    lng,
    user: auth.user,
    changeRoute: pushToHistory
  }
}

export const FeedPageContainer = connect(
  mapStateToProps
)(FeedPage)
