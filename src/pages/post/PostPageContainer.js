import { connect } from 'react-redux'
import { PostPage } from './PostPage'

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

export const PostPageContainer = connect(
  mapStateToProps
)(PostPage)
