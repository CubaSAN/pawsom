import { connect } from 'react-redux'
import { FeedPage } from './FeedPage'

const mapStateToProps = state => {
  const { navigator: { lat, lng }, auth} = state || {}

  return {
    lat,
    lng,
    user: auth.user
  }
}

export const FeedPageContainer = connect(
  mapStateToProps
)(FeedPage)
