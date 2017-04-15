import React, { Component } from 'react'
import { Animated, Dimensions, PanResponder, Text, TouchableOpacity, View } from 'react-native'

import styles from '../styles'

import PointCircle from './PointCircle'

export default class PointRow extends Component {
  constructor(props) {
    super(props)
    /*
    title
    subtitle
    value
    outOfValue
    onPress
    onEditPress
    onDeletePress
    */

    const screen = Dimensions.get('window')
    this.state = {
      open: false,
      width: 0,
      height: 0,
      screenWidth: screen.width,
      screenHeight: screen.height,
      rowPan: new Animated.Value(0),
      opacityPan: new Animated.Value(0)
    }
  }

  _reset() {
    this.setState({ open: false })
    Animated.timing(this.state.rowPan, { toValue: 0, duration: 250 }).start()
    Animated.timing(this.state.opacityPan, { toValue: 0, duration: 250 }).start()
  }

  _open() {
    this.setState({ open: true })
    Animated.timing(this.state.rowPan, { toValue: -80, duration: 250 }).start()
    Animated.timing(this.state.opacityPan, { toValue: 1, duration: 250 }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let dx = gestureState.dx
        if (this.state.open) dx -= 80

        // Row sliding
        this.state.rowPan.setValue(dx)

        // Side button opacity
        let opacity = dx/-80
        if (opacity > 1) opacity = 1
        else if (opacity < 0) opacity = 0
        this.state.opacityPan.setValue(opacity)
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.rowPan._value < -80 || gestureState.vx > 1 && this.state.rowPan._value < 0) {
          // Swipe <--
          this._open()
        }
        else {
          this._reset()
        }
      },
      onPanResponderTerminate: () => this._reset()
    })
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers}>
        <Animated.View style={{ transform: [{ translateX: this.state.rowPan }] }}>
          <TouchableOpacity
            style={styles.pointRow}
            onPress={() => { this.props.onPress(); this._reset() }}
          >
            <View style={styles.pointRowCircle}>
              <PointCircle value={this.props.value} percentage={this.props.percentage} />
            </View>
            <View style={styles.pointRowSection}>
              <Text style={styles.rowTitle}>{this.props.title}</Text>
              <View style={styles.rowSubtitle}>
                <Text style={styles.rowSubtitleText}>{this.props.subtitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.rowSlidein, { opacity: this.state.opacityPan }]} pointerEvents={(this.state.open)? 'auto' : 'none'}>
          <TouchableOpacity
            style={styles.rowSlideinButton}
            onPress={() => { this.props.onEditPress(); this._reset() }}
          >
            <Text style={styles.rowSlideinButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowSlideinButton}
            onPress={() => { this.props.onDeletePress(); this._reset() }}
          >
            <Text style={styles.rowSlideinButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}
