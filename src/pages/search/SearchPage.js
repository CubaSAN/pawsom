import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Thumbnail, FormControl } from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label,
  Form, FormGroup, Input } from 'reactstrap';
import { InfoWindow } from 'react-google-maps'
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import NodeGeocoder from 'node-geocoder'
import { PageLayout } from '../../shared/components/PageLayout'
import { Map, RangeSlider, ModalPopup, MapMarker, CloseIcon, ActionButton } from './components'
import autoBind from 'react-autobind'
import agent from '../../agent'
import _ from 'lodash'
import FaPhone from 'react-icons/lib/fa/phone'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import dog from '../../shared/assets/images/dog.png'
import home from '../../shared/assets/images/home.png'
// import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FileUploaderContainer } from '../../shared/components/FileUploader'
import { FormattedMessage } from 'react-intl'

import 'react-datepicker/dist/react-datepicker.css'
import './SearchPage.scss'
import { messages } from '../../localization'


const CN = 'search-page'

export class SearchPage extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    radius: PropTypes.number.isRequired,
    changeSearchRadius: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      findings: [],
      filter: [],
      infoWindow: null,
      isPopup: false,
      infoPopup: null,
      isAddPopupOpen: false,
      isAddFoundPopupOpen: false,
      date: moment(),
      isFound: false,
      breed: 0,
      petType: 1,
      petList: [],
      breedId: null,
      petBreedAppearence: 0,
      petBreedAppearenceSize: 0,
      urls: [],
      additionalInformation: ''
    }

    this.geocoder = NodeGeocoder({
      provider: 'google'
    })

    autoBind(this)
  }

  componentDidMount() {
    const {lat, lng} = this.props

    if (lat && lng) {
      this.getFindings(this.props)
    }

    this
      .setDafaultBreeds();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lat && nextProps.lng) {
      this.getFindings(nextProps)
    }
  }

  setDafaultBreeds() {
    this.loadBreeds(this.setStateBreedId);
  }

  setStateBreedId(data) {
    const breeds = data.filter(breed => {
      return breed.typeId === this.state.petType
    })

    this.setState({
      breedId: breeds[breeds.ength - 1].id
    })
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
    const {locale} = this.props
    
    return filter.length ?
      findings.filter(finding => filter.includes(messages[locale].breeds[finding.breedName])) :
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
    const {locale} = this.props
    

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
                      (<span><FormattedMessage id='lost.lostpetfound'/> {infoWindow.finding.petName}</span>) :
                      (<span><FormattedMessage id='lost.foundsing'/> </span>)
                  }
                </div>
                <div
                  className={`${CN}__map-marker-desc`}
                >
                  {messages[locale].breeds[infoWindow.finding.breedName]}
                </div>
                <div
                  className={`${CN}__map-marker-info`}
                  onClick={this.onOpenPopup}
                >
                  <FaInfoCircle /> <FormattedMessage id='lost.details'/>
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
        <div><FormattedMessage id='lost.foundby'/> {name}</div>
      )
    } else {
      return (
        <div>Found by unknown person</div>
      )
    }
  }

  renderFindingImage(urls, breedName) {
    const {locale} = this.props
    

    if (urls.length) {
      const imgSrc = this.parseImageUrl(urls[0])

      return (
        <img alt={messages[locale].breeds[breedName]}
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
    if(!url) {
      return 'https://thumbs.dreamstime.com/t/dog-paw-print-bone-ball-seamless-pattern-vector-illustration-70572888.jpg'
    }

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
    const {locale} = this.props
    if (findings.length) {
      const filteredFindings = this.getFilteresFindings(findings)
      const results = filteredFindings.map((finding, i) => {
        return (
          <Col key={i}
            xs={12}
          >
            <Thumbnail
              alt={messages[locale].breeds[finding.breedName] }
              src={this.parseImageUrl(finding.urls[0])}
            >
              <div className={`${CN}__search-item-holder`}>
                <div className={`${CN}__search-item-breed`}>{messages[locale].breeds[finding.breedName]}</div>
                <div className={`${CN}__search-item-name`}>{this.renderFoundBy(finding.foundBy)}</div>
                <div className={`${CN}__search-item-address`}> {finding.localityName}</div>
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
                  <FormattedMessage id='lost.details'/>
                </ActionButton>
              </div>
            </Thumbnail>
          </Col>
        )
      })

      return (
        <div>
          <Row>
            <Col className={`${CN}__search-header`}>
              <FormattedMessage id='lost.found'/> - <span className={`${CN}__search-header-secondary`}>
                {filteredFindings.length} <FormattedMessage id='pets'/>
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
    const {locale} = this.props
    

    const results = _.uniqBy(findings, 'breedName').map((finding, i) => {
      return (
        <div className={`${CN}__sidebar-filter-string`}
          key={i}
        >
          <Label>
            <input
              type="checkbox"
              onChange={this.setFilter}
              value={messages[locale].breeds[finding.breedName]}
              checked={filter.includes(finding.breedName)}
            />
            {` ${messages[locale].breeds[finding.breedName]}`}
          </Label>
        </div>
      )
    })

    return (
      <div className={`${CN}__sidebar-item`}>
        <div className={`${CN}__sidebar-heading`}><FormattedMessage id='breed.breed'/></div>
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

  addFoundPet() {
    this.setState({
      isAddFoundPopupOpen: true
    })
  }

  closeAddPopup() {
    this.setState({
      isAddPopupOpen: false
    })
  }

  closeAddFoundPopup() {
    this.setState({
      isAddFoundPopupOpen: false
    })
  }

  sendAddFoundData() {
    const {
      city,
      country,
      isoCountryCode,
      latitude,
      longitude,
      streetName,
      breedId,
      petBreedAppearence,
      petBreedAppearenceSize,
      urls,
      additionalInformation,
      name
    } = this.state

    const {
      user
    } = this.props

    const body = {
      "AdditionalInformation": additionalInformation,
      "Latitude": latitude,
      "Longitude": longitude,
      "breedId": breedId,
      "Id": 0,
      "OwnerID": user.id,
      "Urls": urls,
      "IsFound": false,
      "City": city,
      "Country": country,
      "LocalityName": streetName,
      "IsoCountryCode": isoCountryCode,
      "SharedPhoneNumber": true,
      "PetBreedAppearence": petBreedAppearence, // 0, 1, 2
      "PetBreedAppearenceSize": petBreedAppearenceSize, // 0, 1, 2, 3
      "Name": name
    }

    agent
      .Search
      .addPet(body, user.token)
      .then(() => {
        this.setState({
          isAddFoundPopupOpen: false
        })
      })
      .catch((err) => {
        new Error(err)
        this.setState({
          isAddFoundPopupOpen: false
        })
      })
  }

  sendAddData() {
    const {
      city,
      country,
      isoCountryCode,
      latitude,
      longitude,
      streetName,
      breedId,
      petBreedAppearence,
      petBreedAppearenceSize,
      urls,
      additionalInformation
    } = this.state

    const {
      user
    } = this.props

    const body = {
      "AdditionalInformation": additionalInformation,
      "Latitude": latitude,
      "Longitude": longitude,
      "breedId": breedId,
      "Id": 0,
      "FoundByPersonId": user.id,
      "Urls": urls,
      "IsFound": false,
      "City": city,
      "Country": country,
      "LocalityName": streetName,
      "IsoCountryCode": isoCountryCode,
      "SharedPhoneNumber": true,
      "PetBreedAppearence": petBreedAppearence, // 0, 1, 2
      "PetBreedAppearenceSize": petBreedAppearenceSize // 0, 1, 2, 3
    }

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

  changePetName(e) {
    const value = e.target.value

    this.setState({
      name: value
    })
  }

  onPlacesChanged() {
    const place = this._searchbox.getPlaces()[0]

    const geoAddress = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    }

    this.geocoder.reverse({ lat: geoAddress.latitude, lon: geoAddress.longitude })
      .then((res) => {
        const resData = res[0]

        this.setState({
          city: resData.city,
          country: resData.country,
          isoCountryCode: resData.countryCode,
          latitude: geoAddress.latitude,
          longitude: geoAddress.longitude,
          streetName: resData.streetName
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  onSearchBoxMounted(ref) {
    this._searchbox = ref
  }

  changeDate(date) {
    this.setState({
      date
    });
  }

  setFound() {
    this.setState({
      isFound: true
    })
  }

  setLost() {
    this.setState({
      isFound: true
    })
  }

  loadBreeds(cb) {
    const { user } = this.props

    agent
      .Pet
      .getBreeds(user.token)
      .then(data => {
        let breedList = []

        if (data.length) {
          breedList = data.map(breed => {
            return {
              breedName: breed.breedName,
              id: breed.id,
              typeId: breed.typeId
            }
          })
        }

        this.setState({
          petList: breedList
        }, () => {
          cb && cb(breedList)
        })
      })
      .catch((err) => {
        new Error(err)
      })
  }

  setBreed() {
    this.setState({
      petBreedAppearence: 2,
      petBreedAppearenceSize: null
    })
  }

  setPossibleBreed() {
    this.setState({
      petBreedAppearence: 1,
      petBreedAppearenceSize: null
    })
  }

  setNotBreed() {
    this.setState({
      petBreedAppearence: 0,
      petBreedAppearenceSize: 0
    })
  }

  setDog() {
    this.setState({
      petType: 1
    })
  }

  setCat() {
    this.setState({
      petType: 2
    })
  }

  onUpload(urls) {
    this.setState({ urls })
  }

  setBreedId(e) {
    const breedId = e.currentTarget.value

    this.setState({
      breedId
    })
  }

  setSmall() {
    this.setState({
      petBreedAppearenceSize: 0
    })
  }

  setMedium() {
    this.setState({
      petBreedAppearenceSize: 1
    })
  }

  setLarge() {
    this.setState({
      petBreedAppearenceSize: 2
    })
  }

  setExtraLarge() {
    this.setState({
      petBreedAppearenceSize: 3
    })
  }

  renderAddModal() {
    const { petBreedAppearence, petList, petType, additionalInformation } = this.state
    const {locale} = this.props
    
    return (
      <Modal isOpen={this.state.isAddPopupOpen}
        className={`${CN}__add-modal`}
      >
        <ModalHeader><FormattedMessage id='lost.addlost'/></ModalHeader>
        <ModalBody>
          <Form>
            {/* <FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="isFound"
                    defaultChecked={isFound}
                    onChange={this.setFound}
                  />{` Pet was found `}
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="isFound"
                    defaultChecked={!isFound}
                    onChange={this.setLost}
                  />
                  {` Pet was lost `}
                </Label>
              </FormGroup>
            </FormGroup> */}
            <FormGroup>
              <Label for='address'><FormattedMessage id='lost.address'/> </Label>
              <StandaloneSearchBox
                type='street_address'
                ref={this.onSearchBoxMounted}
                onPlacesChanged={this.onPlacesChanged}
              >
                <FormControl
                  type='text'
                  name='address'
                  id='address'
                />
              </StandaloneSearchBox>
            </FormGroup>
            <FormGroup>
              <Label for='phone'><FormattedMessage id='phonenum'/></Label>
              <FormControl
                type='text'
                name='phone'
                id='phone'
                value={this.state.phoneNumber}
                onChange={this.changeNumber} />
            </FormGroup>
            {/* <FormGroup>
              <Label for='date'>Date</Label>
              <DatePicker
                id='date'
                selected={this.state.date}
                onChange={this.changeDate}
              />
            </FormGroup> */}
            <FormGroup>
              <legend><FormattedMessage id='lost.information'/> </legend>
              <FormGroup>
                <Label>
                  <Input
                    className="pet-radio"
                    type="radio"
                    name="pet"
                    defaultChecked
                    onChange={this.setDog}
                  /><span className="pet-icon dog-icon">{<FormattedMessage id='dog'/>}</span>
                </Label>
                <Label>
                  <Input
                    className="pet-radio"
                    type="radio"
                    name="pet"
                    onChange={this.setCat}
                  />
                  <span className="pet-icon cat-icon">{<FormattedMessage id='cat'/>}</span>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="breed"
                    onChange={this.setBreed}
                  />{<FormattedMessage id='breed.purebred'/>}
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="breed"
                    onChange={this.setPossibleBreed}
                  />
                  {<FormattedMessage id='breed.mutt'/>}
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="breed"
                    defaultChecked
                    onChange={this.setNotBreed}
                  />
                  {<FormattedMessage id='breed.unknownbreed'/>}
                </Label>
              </FormGroup>
            </FormGroup>
            {
              ((petBreedAppearence === 1 || petBreedAppearence === 2) && petList.length > 0) &&
              <FormGroup>
                <Input
                  type="select"
                  name="breed"
                  onChange={this.setBreedId}
                >
                  {
                    petList
                      .filter(breed => breed.typeId === petType)
                      .map(breed => {
                        return (
                          <option
                            key={breed.id}
                            value={breed.id}>
                            {messages[locale].breeds[breed.breedName]}
                          </option>
                        )
                      })
                  }
                </Input>
              </FormGroup>
            }
            {
              (petBreedAppearence === 0) &&
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="size"
                    defaultChecked
                    onChange={this.setSmall}
                  />{<FormattedMessage id='breed.small'/>}
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="size"
                    onChange={this.setMedium}
                  />{<FormattedMessage id='breed.medium'/>}
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="size"
                    onChange={this.setLarge}
                  />{<FormattedMessage id='breed.large'/>}
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="size"
                    onChange={this.setExtraLarge}
                  />{<FormattedMessage id='breed.varylarge'/>}
                </Label>
              </FormGroup>
            }
            <FormGroup>
              <Label for="additional"><FormattedMessage id='lost.addinfo'/></Label>
              <Input
                type="textarea"
                name="text"
                id="additional"
                value={additionalInformation}
                onChange={this.setAdditionalInfo}
              />
            </FormGroup>
            <FormGroup>
              <FileUploaderContainer onUpload={this.onUpload} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success"
            onClick={this.closeAddPopup}
          ><FormattedMessage id='btnclose'/></Button>
          <Button color="success"
            onClick={this.sendAddData}
          ><FormattedMessage id='btnsave'/></Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderAddFoundModal() {
    const { petList, petType, additionalInformation, petBreedAppearence } = this.state
    const {locale} = this.props
    
    return (
      <Modal isOpen={this.state.isAddFoundPopupOpen}
        className={`${CN}__add-modal`}
      >
        <ModalHeader><FormattedMessage id='lost.addlostpet' /> </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for='address'><FormattedMessage id='lost.address' /> </Label>
            <StandaloneSearchBox
              type='street_address'
              ref={this.onSearchBoxMounted}
              onPlacesChanged={this.onPlacesChanged}
            >
              <FormControl
                type='text'
                name='address'
                id='address'
              />
            </StandaloneSearchBox>
          </FormGroup>
          <FormGroup>
            <Label for='phone'><FormattedMessage id='phonenum' /></Label>
            <FormControl
              type='text'
              name='phone'
              id='phone'
              value={this.state.phoneNumber}
              onChange={this.changeNumber} />
          </FormGroup>
          <FormGroup>
            <Label for='petname'><FormattedMessage id='lost.petname' /></Label>
            <FormControl
              type='text'
              name='petname'
              id='petname'
              value={this.state.petname}
              onChange={this.changePetName} />
          </FormGroup>
          <FormGroup>
            <legend><FormattedMessage id='lost.information' /> </legend>
            <FormGroup>
              <Label>
                <Input
                  className="pet-radio"
                  type="radio"
                  name="pet"
                  defaultChecked
                  onChange={this.setDog}
                /><span className="pet-icon dog-icon">{<FormattedMessage id='dog' />}</span>
              </Label>
              <Label>
                <Input
                  className="pet-radio"
                  type="radio"
                  name="pet"
                  onChange={this.setCat}
                />
                <span className="pet-icon cat-icon">{<FormattedMessage id='cat' />}</span>
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input
                  type="radio"
                  name="breed"
                  onChange={this.setBreed}
                />{<FormattedMessage id='breed.purebred' />}
              </Label>
              <Label>
                <Input
                  type="radio"
                  name="breed"
                  onChange={this.setPossibleBreed}
                />
                {<FormattedMessage id='breed.mutt' />}
              </Label>
              <Label>
                <Input
                  type="radio"
                  name="breed"
                  defaultChecked
                  onChange={this.setNotBreed}
                />
                {<FormattedMessage id='breed.unknownbreed' />}
              </Label>
            </FormGroup>
          </FormGroup>
          {
            ((petBreedAppearence === 1 || petBreedAppearence === 2) && petList.length > 0) &&
            <FormGroup>
              <Input
                type="select"
                name="breed"
                onChange={this.setBreedId}
              >
                {
                  petList
                    .filter(breed => breed.typeId === petType)
                    .map(breed => {
                      return (
                        <option
                          key={breed.id}
                          value={breed.id}>
                          {messages[locale].breeds[breed.breedName]}
                        </option>
                      )
                    })
                }
              </Input>
            </FormGroup>
          }
          {
            (petBreedAppearence === 0) &&
            <FormGroup>
              <Label>
                <Input
                  type="radio"
                  name="size"
                  defaultChecked
                  onChange={this.setSmall}
                />{<FormattedMessage id='breed.small' />}
              </Label>
              <Label>
                <Input
                  type="radio"
                  name="size"
                  onChange={this.setMedium}
                />{<FormattedMessage id='breed.medium' />}
              </Label>
              <Label>
                <Input
                  type="radio"
                  name="size"
                  onChange={this.setLarge}
                />{<FormattedMessage id='breed.large' />}
              </Label>
              <Label>
                <Input
                  type="radio"
                  name="size"
                  onChange={this.setExtraLarge}
                />{<FormattedMessage id='breed.varylarge' />}
              </Label>
            </FormGroup>
          }
          <FormGroup>
            <Label for="additional"><FormattedMessage id='lost.addinfo' /></Label>
            <Input
              type="textarea"
              name="text"
              id="additional"
              value={additionalInformation}
              onChange={this.setAdditionalInfo}
            />
          </FormGroup>
          <FormGroup>
            <FileUploaderContainer onUpload={this.onUpload} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success"
            onClick={this.closeAddFoundPopup}
          ><FormattedMessage id='btnclose' /></Button>
          <Button color="success"
            onClick={this.sendAddFoundData}
          ><FormattedMessage id='btnsave' /></Button>
        </ModalFooter>
      </Modal>
    )
  }

  setAdditionalInfo(e) {
    this.setState({
      additionalInformation: e.currentTarget.value
    })
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
          <div className="action-holder">
            <Button
              className={`${CN}__add-button`}
              color="success"
              onClick={this.addLostPet}
            >
              <FormattedMessage id='lost.addlost'/>
            </Button>
            
          </div>
          <div className="action-holder">
            <Button
              className={`${CN}__add-button`}
              color="success"
              onClick={this.addFoundPet}
            >
            <FormattedMessage id='lost.addlostpet'/>
            </Button>
          </div>
          <div className={`${CN}__sidebar-header`}><FormattedMessage id='lost.filter'/></div>
          <div className={`${CN}__sidebar-item`}>
            <div className={`${CN}__sidebar-heading`}><FormattedMessage id='lost.distance'/></div>
            <RangeSlider onRadiusChange={changeSearchRadius}
              value={radius}
            />
          </div>

          {!!findings.length && this.renderBreedFilter()}
        </Col>
        {this.renderAddModal()}
        {this.renderAddFoundModal()}
      </PageLayout>
    )
  }
}
