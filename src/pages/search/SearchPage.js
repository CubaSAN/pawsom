import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Thumbnail, FormControl } from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label,
  Form, FormGroup } from 'reactstrap';
import { InfoWindow } from 'react-google-maps'
import { PageLayout } from '../../shared/components/PageLayout'
import { Map, RangeSlider, ModalPopup, MapMarker, CloseIcon, ActionButton } from './components'
import autoBind from 'react-autobind'
import agent from '../../agent'
import _ from 'lodash'
import FaPhone from 'react-icons/lib/fa/phone'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import dog from '../../shared/assets/images/dog.png'
import home from '../../shared/assets/images/home.png'
import './SearchPage.scss'


const CN = 'search-page'

export class SearchPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    radius: PropTypes.number.isRequired,
    changeSearchRadius: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      findings: [],
      filter: [],
      infoWindow: null,
      isPopup: false,
      infoPopup: null,
      isAddPopupOpen: false
    }

    autoBind(this)
  }

  componentDidMount() {
    const {lat, lng} = this.props

    if (lat && lng) {
      this.getFindings(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lat && nextProps.lng) {
      this.getFindings(nextProps)
    }
  }

  changeGeoFormat(value) {
    return value.toFixed(6)
  }

  setFindings(data) {
    const findings = _.reverse(data.map(finding => {
      const { breedName } = finding.breed

      return {
        breedName,
        foundBy: finding.foundBy,
        localityName: finding.localityName,
        urls: finding.urls,
        phoneNumber: finding.phoneNumber,
        latitude: finding.latitude,
        longitude: finding.longitude,
        petName: finding.petName,
        additionalInformation: finding.additionalInformation
      }
    }))

    this.setState({ findings })
  }

  getFilteresFindings(findings) {
    const { filter } = this.state

    return filter.length ?
      findings.filter(finding => filter.includes(finding.breedName)) :
      findings
  }

  getFindings(nextProps) {
    const { radius, lat, lng, user } = nextProps
    const radiusInMeters = radius * 1000
    const replacedLat = this.changeGeoFormat(lat)
    const replacedLng = this.changeGeoFormat(lng)

    agent
      .Search
      .searchLost(radiusInMeters, replacedLat, replacedLng, user.token)
      .then(data => {
        data && this.setFindings(data)
      })
      .catch((err) => {
        new Error(err)
      })
  }

  onMarkerClick(finding) {
    this.setState({
      infoWindow: {
        finding
      }
    })
  }

  onMarkerCloseClick() {
    this.setState({
      infoWindow: null
    })
  }

  renderMap() {
    const { lat, lng } = this.props
    const center = { lat, lng }
    const { findings, infoWindow } = this.state

    return (
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        center={center}
      >
        <MapMarker
          position={center}
          icon={home}
        />

        {!!findings.length && this.getFilteresFindings(findings).map((finding, i) => {
          const position = {
            lat: finding.latitude,
            lng: finding.longitude
          }

          return (
            <MapMarker
              key={i}
              position={position}
              icon={dog}
              onClick={this.onMarkerClick}
              finding={finding}
            />
          )
        })}

        {
          !!infoWindow &&
            <InfoWindow 
              position={{
                lat: infoWindow.finding.latitude,
                lng: infoWindow.finding.longitude,
              }}
              onCloseClick={this.onMarkerCloseClick}
            >
              <div>
                <div
                  className={`${CN}__map-marker-header`}
                >
                  { 
                    infoWindow.finding.petName ?
                      (<span>Lost: {infoWindow.finding.petName}</span>) :
                      (<span>Found</span>)
                  }
                </div>
                <div
                  className={`${CN}__map-marker-desc`}
                >
                  {infoWindow.finding.breedName}
                </div>
                <div
                  className={`${CN}__map-marker-info`}
                  onClick={this.onOpenPopup}
                >
                  <FaInfoCircle /> info
                </div>
              </div>
            </InfoWindow>
        }
      </Map>
    )
  }

  onOpenPopup() {
    this.setState({
      isPopup: true
    })
  }

  renderMapSection() {
    const { lat, lng } = this.props
    const isNavigatorAvailable = lat && lng

    if (isNavigatorAvailable) {
      return this.renderMap()
    }
  }

  renderFoundBy(name) {
    if (name) {
      return (
        <div>Found by {name}</div>
      )
    } else {
      return (
        <div>Found by unknown person</div>
      )
    }
  }

  renderFindingImage(urls, breedName) {
    if (urls.length) {
      const imgSrc = this.parseImageUrl(urls[0])

      return (
        <img alt={breedName}
          src={imgSrc}
        /> 
      )
    } else {
      return (
        <div>No image</div>
      )
    }
  }

  parseImageUrl(url) {
    const parts = url.split('/')

    return parts.slice(0, 5).concat(['resized'], parts.slice(-1)).join('/')
  }

  onCardDetails(finding) {
    
    this.setState({
      infoWindow: {
        finding
      }
    }, () => {
      this.onOpenPopup()
    })
  }

  renderFindings() {
    const { findings, isPopup, infoWindow } = this.state

    if (findings.length) {
      const filteredFindings = this.getFilteresFindings(findings)
      const results = filteredFindings.map((finding, i) => {
        return (
          <Col key={i}
            xs={12}
          >
            {finding.urls[0] &&
              <Thumbnail
                alt={finding.breedName}
                src={this.parseImageUrl(finding.urls[0])}
              >
                <div className={`${CN}__search-item-holder`}>
                  <div className={`${CN}__search-item-breed`}>{finding.breedName}</div>
                  <div className={`${CN}__search-item-name`}>{this.renderFoundBy(finding.foundBy)}</div>
                  <div className={`${CN}__search-item-address`}>on {finding.localityName}</div>
                  <div className={`${CN}__search-item-phone`}>
                    <FaPhone />
                    <a className={`${CN}__search-item-phone-link`}
                      href={`tel:${finding.phoneNumber}`}
                    >
                      {` ${finding.phoneNumber}`}
                    </a>
                    <span></span>
                  </div>
                </div>
                <div className={`${CN}__search-item-actions`}>
                  <ActionButton
                    color={'success'}
                    onClick={this.onCardDetails}
                    finding={finding}
                  >
                    Details
                  </ActionButton>
                </div>
              </Thumbnail>
            }
          </Col>
        )
      })

      return (
        <div>
          <Row>
            <Col className={`${CN}__search-header`}>
              Found - <span className={`${CN}__search-header-secondary`}>
                {filteredFindings.length} pets
              </span>
            </Col>
          </Row>
          <Row>
            {results}
          </Row>
          {
            isPopup && 
              <ModalPopup 
                className={`${CN}__search-modal`} 
                toggle={this.onPopupToggle}
                isOpen={isPopup}
                data={infoWindow}
              />
          }
        </div>
      )
    }
  }

  onPopupToggle() {
    this.setState({
      isPopup: !this.state.isPopup
    })
  }

  setFilter(e) {
    const { filter } = this.state
    const { value } = e.target

    if (filter.includes(value)) {
      const index = filter.indexOf(value)
      this.setState({
        filter: filter.slice(0, index).concat(filter.slice(index + 1))
      })
    } else {
      this.setState({
        filter: filter.concat([value])
      })
    }
  }

  renderBreedFilter() {
    const { findings, filter } = this.state

    const results = _.uniqBy(findings, 'breedName').map((finding, i) => {
      return (
        <div className={`${CN}__sidebar-filter-string`}
          key={i}
        >
          <Label>
            <input 
              type="checkbox" 
              onChange={this.setFilter} 
              value={finding.breedName}
              checked={filter.includes(finding.breedName)}
            />
            {` ${finding.breedName}`}
          </Label>
        </div>
      )
    })

    return (
      <div className={`${CN}__sidebar-item`}>
        <div className={`${CN}__sidebar-heading`}>Breed</div>
        <ul className={`${CN}__selected-filters`}>
          {filter.map((filterItem, i) => {
            return (
              <li className={`${CN}__selected-item`}
                key={i}
              >
                <span className={`${CN}__selected-item-text`}>{filterItem}</span>
                <span className={`${CN}__selected-item-icon`}>
                  <CloseIcon 
                    onClick={this.removeFilterItem}
                    item={filterItem}
                  />
                </span>
              </li>
            )
          })}
        </ul>
        {results}
      </div>
    )
  }

  removeFilterItem(value) {
    const { filter } = this.state

    const index = filter.indexOf(value)
    this.setState({
      filter: filter.slice(0, index).concat(filter.slice(index + 1))
    })
  }

  addLostPet() {
    this.setState({
      isAddPopupOpen: true
    })
  }

  closeAddPopup() {
    this.setState({
      isAddPopupOpen: false
    })
  }


  sendAddData() {
    const { 
      user,
      lat,
      lng
    } = this.props

    const {
      number
    } = this.state

    // const body =
    //   { 
    //     "Latitude": 49.844268993379217,
    //     "Longitude": 24.011251007635945,
    //     "PhoneNumber": '777-777-771',
        // "PetName": null,
        // "Breed": { 
        //   "ID": 1,
        //   "BreedName": "Affenpinscher",
        //   "BreedLink": null,
        //   "BreedResourceCode": null,
        //   "TypeId": 1,
        //   "TypeName": null
        // },
        // "breedId": 1,
        // "AdditionalInformation": "",
        // "Created": "0001-01-01T00:00:00",
        // "Found": "2017-11-23T13:49:41.89077Z",
        // "FoundBy": null,
        // "FoundByPerson": null,
        // "FoundByPersonId": 7,
        // "Urls": ["https://pawcdn.azureedge.net/images/isiarube@gmail.com/3ed8e97148aa417e8231c2bddb1fe82d-.jpg"],
        // "Owner": null,
        // "OwnerID": null,
        // "PetId": null,
        // "IsFound": false,
        // "City": "Lviv",
        // "Country": "Ukraine",
        // "LocalityName": "Tarasa Shevchenkas Street",
        // "IsoCountryCode": "UA",
        // "SharedPhoneNumber": true,
        // "PetBreedAppearence": 1,
        // "PetBreedAppearenceSize": null,
        // "TypeId": 105,
        // "ID": 0
    //   }

    const body = {
      latitude: lat,
      longitude: lng,
      phoneNumber: number, // Phone is not added
      "PetName": null,
      "Breed": {
        "ID": 1,
        "BreedName": "Affenpinscher",
        "BreedLink": null,
        "BreedResourceCode": null,
        "TypeId": 1,
        "TypeName": null
      },
      "breedId": 1,
      "AdditionalInformation": "",
      "Found": "2017-11-23T13:49:41.89077Z",
      "FoundBy": null,
      "FoundByPerson": null,
      "FoundByPersonId": 7,
      "Urls": ["https://pawcdn.azureedge.net/images/isiarube@gmail.com/3ed8e97148aa417e8231c2bddb1fe82d-.jpg"],
      "Owner": null,
      "OwnerID": null,
      "PetId": null,
      "IsFound": false,
      "City": "Lviv",
      "Country": "Ukraine",
      "LocalityName": "Tarasa Shevchenkas Street",
      "IsoCountryCode": "UA",
      "SharedPhoneNumber": true,
      "PetBreedAppearence": 1,
      "PetBreedAppearenceSize": null,
      "TypeId": 105,
      "ID": 0
    }

    debugger;

    agent
      .Search
      .addPet(body, user.token)
      .then(() => {
        this.setState({
          isAddPopupOpen: false
        })
      })
      .catch((err) => {
        new Error(err)
        this.setState({
          isAddPopupOpen: false
        })
      })
  }

  changeNumber(e) {
    const value = e.target.value

    this.setState({
      number: value
    })
  }

  renderAddModal() {
    return (
      <Modal isOpen={this.state.isAddPopupOpen}>
        <ModalHeader>Add Lost or Found Pet</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='phone'>Phone</Label>
              <FormControl type='phone'
                name='phone'
                id='phone'
                value={this.state.phoneNumber}
                onChange={this.changeNumber} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success"
            onClick={this.closeAddPopup}
          >Close</Button>
          <Button color="success"
            onClick={this.sendAddData}
          >Submit</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    const { changeSearchRadius, radius, lat, lng } = this.props
    const { findings } = this.state

    return (
      <PageLayout
        isPageAvailable={lat && lng}
      >
        <Col
          md={9}
          xs={12}
          className={CN}
        >
          <div className={`${CN}__map`}>
            {this.renderMapSection()}
          </div>

          {!!findings.length && this.renderFindings()}

          {
            !findings.length &&
              <div className={`${CN}__no-results`}>
                No results yet, please use filters
              </div>
          }
        </Col>
        <Col
          className={`${CN}__sidebar`}
          md={3}
          xs={12}
        >
          <div>
            <Button
              className={`${CN}__add-button`}
              color="success"
              onClick={this.addLostPet}
            >
              Add Lost or Found Pet
            </Button>
          </div>
          <div className={`${CN}__sidebar-header`}>Filters</div>
          <div className={`${CN}__sidebar-item`}>
            <div className={`${CN}__sidebar-heading`}>Distance from your location</div>
            <RangeSlider onRadiusChange={changeSearchRadius}
              value={radius}
            />
          </div>

          {!!findings.length && this.renderBreedFilter()}
        </Col>
        {this.renderAddModal()}
      </PageLayout>
    )
  }
}
