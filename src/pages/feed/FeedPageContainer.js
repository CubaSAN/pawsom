import { connect } from 'react-redux'
import { FeedPage } from './FeedPage'

const mapStateToProps = state => {
  const { navigator: { lat, lng }} = state || {}

  return {
    lat,
    lng
  }
}

export const FeedPageContainer = connect(
  mapStateToProps
)(FeedPage)
