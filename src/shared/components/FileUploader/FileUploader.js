import React, { Component } from 'react'
import Gallery from 'react-fine-uploader'
import FineUploaderAzure from 'fine-uploader-wrappers/azure'

import './FileUploader.scss'

const uploader = new FineUploaderAzure({
  options: {
    signature: {
      endpoint: 'http://pawsom.azurewebsites.net/signature',
    },
    request: {
      endpoint: 'https://pawsom.blob.core.windows.net/images'
    }
  }
})

export class FileUploader extends Component {
  render () {
    return (
      <Gallery uploader={uploader} />
    )
  }
}
