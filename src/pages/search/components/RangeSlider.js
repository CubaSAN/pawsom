import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-rangeslider'
import autoBind from 'react-autobind'

export class RangeSlider extends Component {
  static propTypes = {
    onRadiusChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      value: this.props.value
    }

    autoBind(this);
  }

  convertValue(value, converter) {
    return converter(value)
  }

  multiplyBy1000(value) {
    return value * 1000
  }

  addDistanceDimentions(value) {
    return `${value} km`
  }

  handleChange(value) {
    this.setState({
      value: value
    })
  };

  handleChangeComplete() {
    const { onRadiusChange } = this.props;
    onRadiusChange(this.state.value);
  }

  render() {
    const { value } = this.state
    return (
      <div className='slider'>
        <div className='value'>{this.addDistanceDimentions(value)}</div>

        <Slider
          min={1}
          max={49}
          value={value}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
          format={this.addDistanceDimentions}
        />
      </div>
    )
  }
}
