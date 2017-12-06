import { connect } from 'react-redux'
import { PublicPostPage } from './PublicPostPage'

const mapStateToProps = state => {
  const { navigator: { lat, lng }} = state || {}
  return {
    lat,
    lng
  }
}

export const PublicPostPageContainer = connect(
  mapStateToProps
)(PublicPostPage)
