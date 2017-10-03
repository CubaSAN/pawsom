import React, { Component } from 'react'
import Slider from 'react-slick'
import { Container, Row, Col } from 'reactstrap'
import { LandingLayout } from '../../shared/components/LandingLayout'
import avatarDummyImage from '../../shared/assets/images/landing-page/girl.png'
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis est inventore, pariatur repellat, ad esse obcaecati vero, possimus assumenda iure amet cumque blanditiis autem. Quas laboriosam incidunt libero sed officiis.
          </div>
          <div className={`${CN}__feedback-carousel-meta`}>
            <div className={`${CN}__feedback-carousel-avatar`}>
              <img src={avatarDummyImage} alt="User" />
            </div>
            <div className={`${CN}__feedback-carousel-user`}>
              Angel Adam
            </div>
          </div>
        </div>

        <div className={`${CN}__feedback-carousel-item`}>
          <div className={`${CN}__feedback-carousel-body`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis est inventore, pariatur repellat, ad esse obcaecati vero, possimus assumenda iure amet cumque blanditiis autem. Quas laboriosam incidunt libero sed officiis.
          </div>
          <div className={`${CN}__feedback-carousel-meta`}>
            <div className={`${CN}__feedback-carousel-avatar`}>
              <img src={avatarDummyImage} alt="User" />
            </div>
            <div className={`${CN}__feedback-carousel-user`}>
              Angel Adam
            </div>
          </div>
        </div>

        <div className={`${CN}__feedback-carousel-item`}>
          <div className={`${CN}__feedback-carousel-body`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis est inventore, pariatur repellat, ad esse obcaecati vero, possimus assumenda iure amet cumque blanditiis autem. Quas laboriosam incidunt libero sed officiis.
          </div>
          <div className={`${CN}__feedback-carousel-meta`}>
            <div className={`${CN}__feedback-carousel-avatar`}>
              <img src={avatarDummyImage} alt="User" />
            </div>
            <div className={`${CN}__feedback-carousel-user`}>
              Angel Adam
            </div>
          </div>
        </div>
      </Slider>
    )
  }

  render() {
    return (
      <LandingLayout>
        <Container fluid>
          <Row className={`${CN}__banner`}>
            <Container>
              <div className={`${CN}__banner-content`}>
                <h2>
                  <FormattedMessage id="landing.banner.main" />
                </h2>
                <span>
                  <FormattedMessage id="landing.banner.sub" />
                </span>
              </div>
            </Container>
          </Row>
        </Container>

        <Container fluid>
          <Row className={`${CN}__ad1`}>
            <Container>
              <div className={`${CN}__ad1-content`}>
                <div className={`${CN}__ad1-text-main`}>
                  <FormattedMessage id="download" />
                </div>

                <div className={`${CN}__ad1-buttons`}>
                  <a 
                    className={`btn ${CN}__ad1-cta`} 
                    href='https://www.appstore.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    App Store
                  </a>

                  <a
                    className={`btn ${CN}__ad1-cta`}
                    href='https://play.google.com/store'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Play Market
                  </a>
                </div>
              </div>
            </Container>
          </Row>
        </Container>

        <Container fluid>
          <Row className={`${CN}__feedback`}>
            <Container className={`${CN}__feedback-wrapper`}>
              <h3 className={`${CN}__feedback-title`}>
                <FormattedMessage id="feedback.title" />
              </h3>

              {this.renderSlider()}
            </Container>
          </Row>
        </Container>

        <Container fluid>
          <Row className={`${CN}__facilities`}>
            <Container>
              <h3 className={`${CN}__facilities-title`}>
                We promise you perfect service
              </h3>

              <Row noGutters className={`${CN}__facilities-wrapper`}>
                <Col md="4" xs="12" sm="6" className={`${CN}__facilities-item`}>
                  <h4>Benefit 1</h4>
                  <p>Lorem ipsum dolor sit amet, pri mutat dicam maiestatis</p>
                </Col>
                <Col md="4" xs="12" sm="6" className={`${CN}__facilities-item`}>
                  <h4>Benefit 2</h4>
                  <p>Lorem ipsum dolor sit amet, pri mutat dicam maiestatis</p>
                </Col>
                <Col md="4" xs="12" sm="6" className={`${CN}__facilities-item`}>
                  <h4>Benefit 3</h4>
                  <p>Lorem ipsum dolor sit amet, pri mutat dicam maiestatis</p>
                </Col>
                <Col md="4" xs="12" sm="6" className={`${CN}__facilities-item`}>
                  <h4>Benefit 4</h4>
                  <p>Lorem ipsum dolor sit amet, pri mutat dicam maiestatis</p>
                </Col>
                <Col md="4" xs="12" sm="6" className={`${CN}__facilities-item`}>
                  <h4>Benefit 5</h4>
                  <p>Lorem ipsum dolor sit amet, pri mutat dicam maiestatis</p>
                </Col>
                <Col md="4" xs="12" sm="6" className={`${CN}__facilities-item`}>
                  <h4>Benefit 6</h4>
                  <p>Lorem ipsum dolor sit amet, pri mutat dicam maiestatis</p>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>

      </LandingLayout>
    )
  }
}
