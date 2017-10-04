import { connect } from 'react-redux'
import { FeedPage } from './FeedPage'

const mapStateToProps = state => {
  const { navigator: { lat, lng }} = state || {}
  const { id, token } = state.auth.user

  return {
    lat,
    lng,
    id,
    token
  }
}

export const FeedPageContainer = connect(
  mapStateToProps
)(FeedPage)
