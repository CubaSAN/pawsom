import React, { Component } from 'react'
import Slider from 'react-rangeslider'

export class RangeSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: 10
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  render() {
    const { value } = this.state
    return (
      <div className='slider'>
        <Slider
          min={1}
          max={49}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='value'>{value}</div>
      </div>
    )
  }
}
