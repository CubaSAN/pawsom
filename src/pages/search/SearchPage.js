import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Button } from 'reactstrap'
import { PageLayout } from '../../shared/components/PageLayout'
import { Map, RangeSlider } from './components'
import agent from '../../agent'
import './SearchPage.scss'

const CN = 'search-page'

export class SearchPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    radius: PropTypes.number.isRequired,
    changeSearchRadius: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      findings: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lat && nextProps.lng) {
      this.getFindings(nextProps)
    }
  }

  changeGeoFormat(value) {
    return value.toString().replace(/\./g, ',')
  }

  getFindings(nextProps) {
    const { radius, lat, lng, user } = nextProps
    const radiusInMeters = radius * 1000
    // const replacedLat = this.changeGeoFormat(lat)
    // const replacedLng = this.changeGeoFormat(lng)

    const replacedLng = 23.985160
    const replacedLat = 49.815461

    agent
      .Search
      .searchLost(radiusInMeters, replacedLat, replacedLng, user.token)
      .then(data => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderMap() {
    const { lat, lng } = this.props
    const center = { lat, lng }

    return (
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={center}
      />
    )
  }

  renderMapPlaceHolder() {
    return (
      <div className={`${CN}__map-placeholder`}>
        Please allow location in browser to use map
      </div>
    )
  }

  renderMapSection() {
    const { lat, lng } = this.props;
    const isNavigatorAvailable = lat && lng;

    if (isNavigatorAvailable) {
      return this.renderMap()
    } else {
      return this.renderMapPlaceHolder()
    }
  }

  renderFindings() {
    const { findings } = this.state

    if (findings.length) {
      return findings.map(finding => {

      })
    } else {
      return (
        <div>No results</div>
      )
    }
  }

  render() {
    const { changeSearchRadius, radius } = this.props;

    return (
      <PageLayout className={CN}>
        <Col md={9}>
          {this.renderMapSection()}
        </Col>
        <Col className={`${CN}__sidebar`} md={3}>
          <div className={`${CN}__sidebar-header`}>Filters</div>
          <div className={`${CN}__sidebar-item`}>
            <div className={`${CN}__sidebar-heading`}>Distance from your location</div>
            <RangeSlider onRadiusChange={changeSearchRadius} value={radius} />
          </div>
          <div className={`${CN}__sidebar-item`}>
            <div className={`${CN}__sidebar-heading`}>Breed</div>
          </div>
        </Col>
      </PageLayout>
    )
  }
}
