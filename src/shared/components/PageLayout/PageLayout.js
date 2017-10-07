import React from 'react'
import { Grid, Row } from 'react-bootstrap'
import { HeaderContainer } from '../Header'
import { WithGeolocation } from '../WithGeolocation'
import './PageLayout.scss'

const CN = 'page-layout'

export const PageLayout = (props) => {
  return (
    <WithGeolocation isPageAvailable={!!props.isPageAvailable}>
      <div className={CN}>
        <Grid fluid>
          <Row>
            <HeaderContainer />
          </Row>

          <Grid>
            <Row className={`${CN}__content`}>
              {props.children}
            </Row>
          </Grid>
        </Grid>
      </div>
    </WithGeolocation>
  )
}
