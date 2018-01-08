import { connect } from 'react-redux'
import { PostPage } from './PostPage'

const mapStateToProps = state => {
  const { navigator: { lat, lng }, locales} = state || {}
  const { id, token } = state.auth.user

  return {
    lat,
    lng,
    id,
    token,
    locale: locales.locale
  }
}

export const PostPageContainer = connect(
  mapStateToProps
)(PostPage)
