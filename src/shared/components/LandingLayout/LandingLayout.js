import React from 'react'
import { HeaderContainer } from '../Header'
import './LandingLayout.scss'

const CN = 'landing-layout'

export const LandingLayout = (props) => {
  return (
    <div className={CN}>
      <HeaderContainer />

      {props.children}
    </div>
  )
}
