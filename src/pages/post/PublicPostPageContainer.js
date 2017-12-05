import { connect } from 'react-redux'
import { PublicPostPage } from './PublicPostPage'

// const mapStateToProps = state => {
//   // const { navigator: { lat, lng }} = state || {}
//   // const { id, token } = state.auth.user
//   //
//   // return {
//   //   lat,
//   //   lng,
//   //   id,
//   //   token
//   // }
// }

export const PublicPostPageContainer = connect(
  // mapStateToProps
)(PublicPostPage)
