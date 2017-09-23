import React from 'react'

const CN = 'landing-layout'

export const LandingLayout = (props) => {
  return (
    <div className={CN}>
      {props.children}
    </div>
  )
}
