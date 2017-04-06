import React, { Component } from 'react'
import { View } from 'react-native'
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg'

export default class Diamond extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color || '#ffffff',
      size: this.props.size || 100
    }
  }

  render() {
    return (
      <Svg
        height={this.state.size}
        width={this.state.size}
      >
        <Rect
          x={this.state.size/4}
          y={this.state.size/4}
          origin={this.state.size/2 + ',' + this.state.size/2}
          width={this.state.size/2}
          height={this.state.size/2}
          stroke={this.state.color}
          strokeWidth={this.state.size/5}
          fill="transparent"
          rotate="45"
        />
      </Svg>
    )
  }
}
