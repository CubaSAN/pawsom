
import { connect } from 'react-redux'
import { FileUploader } from './FileUploader'

const mapStateToProps = state => {
  const { auth } = state || {}

  return {
    user: auth.user
  }
}

export const FileUploaderContainer = connect(
  mapStateToProps
)(FileUploader)
