import { connect } from 'react-redux'
import { FeedPage } from './FeedPage'

const mapStateToProps = state => {
  const { navigator: { lat, lng }, auth, locales} = state || {}

  return {
    lat,
    lng,
    user: auth.user,
    locale: locales.locale
  }
}

export const FeedPageContainer = connect(
  mapStateToProps
)(FeedPage)
