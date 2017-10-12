import React, { Component } from 'react'
import Gallery from 'react-fine-uploader'
import FineUploaderAzure from 'fine-uploader-wrappers/azure'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import './FileUploader.scss'

const CDN = 'https://pawcdn.azureedge.net'

export class FileUploader extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  constructor(props) {
    super(props)

    this._uploader = new FineUploaderAzure({
      options: {
        signature: {
          endpoint: 'http://pawsom.azurewebsites.net/api/Utility/AssetToken',
          customHeaders: {
            'Authorization': `Bearer ${props.user.token}`
          }
        },
        request: {
          endpoint: 'https://pawsom.blob.core.windows.net'
        },
        deleteFile: {
          enabled: true,
          endpoint: 'https://pawsom.blob.core.windows.net'
        },
      }
    });

    this.state = {
      uploads: []
    }

    autoBind(this)
  }

  componentDidMount() {
    this._uploader.on('statusChange', (id, oldStatus, newStatus) => {
      if (newStatus === 'upload successful') {
        const files = this._uploader.methods.getUploads()

        const fileUrls = files.map((file) => {
          return {
            id: file.id,
            name: this.createFileName(file),
          }
        })

        this.setState(
          { uploads: fileUrls },
          this.exposeUploads(fileUrls)
        )

      } else if (this.isCanceled(newStatus)) {
        console.log(1);
      }
    })
  }

  exposeUploads(fileUrls) {
    const urls = fileUrls.map((url) => {
      return url.name
    })

    this.props.onUpload(urls)
  }

  createFileName(fileChunks) {
    const { user } = this.props

    const fileNameChunks = fileChunks.originalName.split('.')
    const fileExtention = fileNameChunks[fileNameChunks.length - 1]

    return `${CDN}/images/${user.email}/${fileChunks.uuid}.${fileExtention}`
  }

  isCanceled(status) {
    return ['canceled', 'deleted'].includes(status)
  }

  render () {
    console.log('1aDD')
    return (
      <Gallery uploader={this._uploader} />
    )
  }
}
