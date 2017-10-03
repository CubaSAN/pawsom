import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

const CN = 'google-map'

export const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    className={CN}
    defaultZoom={12}
    defaultCenter={props.center}
  >
    {props.children}
  </GoogleMap>
))
