import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Button } from 'reactstrap'
import { PageLayout } from '../../shared/components/PageLayout'
import { Map, RangeSlider } from './components'
import './SearchPage.scss'

export class SearchPage extends Component {
  static propTypes = {
    changeCoords: PropTypes.func.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    const { changeCoords } = this.props;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords

        changeCoords({
          lat: latitude,
          lon: longitude
        })
      });
    } else {
      /* geolocation IS NOT available */
    }
  }

  render() {
    const center = {
      lat: this.props.lat,
      lng: this.props.lon
    }

    return (
      <PageLayout>
        <Col md={9}>
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            center={center}
          />
        </Col>
        <Col md={3}>
          <div>Apply filter</div>
          <RangeSlider />
        </Col>
      </PageLayout>
    )
  }
}
