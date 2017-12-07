import React, { Component } from 'react'
import Slider from 'react-slick'
import { Grid, Row, Col } from 'react-bootstrap'
import { LandingLayout } from '../../shared/components/LandingLayout'
import queryString from 'query-string'
import { FormattedMessage } from 'react-intl'

import './HomePage.scss'

const CN = 'home-page'

export class HomePage extends Component {
  renderSlider() {
    var settings = {
      dots: false,
      arrows: false,
      autoplay: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }

    return (
      <Slider {...settings}
        className={`${CN}__feedback-carousel`}
      >
        <div className={`${CN}__feedback-carousel-item`}>
          <div className={`${CN}__feedback-carousel-body`}>
            <FormattedMessage id='feedback.first' />
          </div>
          <div className={`${CN}__feedback-carousel-meta`}>
            {/* <div className={`${CN}__feedback-carousel-avatar`}>
              <img alt='User'
                src={avatarDummyImage}
              />
            </div>
            <div className={`${CN}__feedback-carousel-user`}>
              Angel Adam
            </div> */}
          </div>
        </div>

        <div className={`${CN}__feedback-carousel-item`}>
          <div className={`${CN}__feedback-carousel-body`}>
            <FormattedMessage id='feedback.second' />
          </div>
          <div className={`${CN}__feedback-carousel-meta`}>
            {/* <div className={`${CN}__feedback-carousel-avatar`}>
              <img alt='User'
                src={avatarDummyImage}
              />
            </div>
            <div className={`${CN}__feedback-carousel-user`}>
              Angel Adam
            </div> */}
          </div>
        </div>

        <div className={`${CN}__feedback-carousel-item`}>
          <div className={`${CN}__feedback-carousel-body`}>
            <FormattedMessage id='feedback.third' />
          </div>
          <div className={`${CN}__feedback-carousel-meta`}>
            {/* <div className={`${CN}__feedback-carousel-avatar`}>
              <img alt='User'
                src={avatarDummyImage}
              />
            </div>
            <div className={`${CN}__feedback-carousel-user`}>
              Angel Adam
            </div> */}
          </div>
        </div>
      </Slider>
    )
  }

  render() {
    const parsed = queryString.parse(window.location.search)
    const ifMobileMarketsAvailable = parsed.showDownload !== 'hide'

    return (
      <div className={CN}>
        <LandingLayout>
          <Grid fluid>
            <Row className={`${CN}__banner`}>
              <Grid>
                <div className={`${CN}__banner-content`}>
                  <h2>
                    <FormattedMessage id='landing.banner.main' />
                  </h2>
                  <span>
                    <FormattedMessage id='landing.banner.sub' />
                  </span>
                </div>
              </Grid>
            </Row>
          </Grid>

          {
            ifMobileMarketsAvailable &&
            <Grid fluid>
              <Row className={`${CN}__ad1`}>
                <Grid>
                  <div className={`${CN}__ad1-content`}>
                    <div className={`${CN}__ad1-text-main`}>
                      <FormattedMessage id='download' />
                    </div>
                    <div className={`${CN}__ad1-buttons`}>
                       
                      <a
                        className={`btn ${CN}__ad1-cta`}
                        href='https://itunes.apple.com/us/app/apple-store/id1296340728'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img src="https://pwcdn.azureedge.net/images/general/appstore_pawsom_ios.png" width="200" height="200"/>
                      </a>

                      {/* <a
                        className={`btn ${CN}__ad1-cta`}
                        href='https://play.google.com/store'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Play Market
                      </a> */}
                    </div>
                  </div>
                </Grid>
              </Row>
            </Grid>
          }

          <Grid fluid>
            <Row className={`${CN}__feedback`}>
              <Grid className={`${CN}__feedback-wrapper`}>
                <h3 className={`${CN}__feedback-title`}>
                  <FormattedMessage id='feedback.title' />
                </h3>

                {this.renderSlider()}
              </Grid>
            </Row>
          </Grid>

          <Grid>
            <h3 className={`${CN}__facilities-title`}>
              <FormattedMessage id='benefit.title' />
            </h3>
            <Row className={`${CN}__facilities-wrapper`}>
              <Col className={`${CN}__facilities-item`}
                md={4}
                sm={6}
                xs={12}
              >
                <h4><FormattedMessage id='benefit.first.header' /></h4>
                <p><FormattedMessage id='benefit.first.message' /></p>
              </Col>
              <Col className={`${CN}__facilities-item`}
                md={4}
                sm={6}
                xs={12}
              >
                <h4><FormattedMessage id='benefit.second.header' /></h4>
                <p><FormattedMessage id='benefit.second.message' /></p>
              </Col>
              <Col className={`${CN}__facilities-item`}
                md={4}
                sm={6}
                xs={12}
              >
                <h4><FormattedMessage id='benefit.third.header' /></h4>
                <p><FormattedMessage id='benefit.third.message' /></p>
              </Col>
              <Col className={`${CN}__facilities-item`}
                md={4}
                sm={6}
                xs={12}
              >
                <h4><FormattedMessage id='benefit.fourth.header' /></h4>
                <p><FormattedMessage id='benefit.fourth.message' /></p>
              </Col>
              <Col className={`${CN}__facilities-item`}
                md={4}
                sm={6}
                xs={12}
              >
                <h4><FormattedMessage id='benefit.fifth.header' /></h4>
                <p><FormattedMessage id='benefit.fifth.message' /></p>
              </Col>
              <Col className={`${CN}__facilities-item`}
                md={4}
                sm={6}
                xs={12}
              >
                <h4><FormattedMessage id='benefit.sixth.header' /></h4>
                <p><FormattedMessage id='benefit.sixth.message' /></p>
              </Col>
            </Row>
          </Grid>
        </LandingLayout>
      </div>
    )
  }
}
