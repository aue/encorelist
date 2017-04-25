import React, { Component } from 'react'
import { Animated, Dimensions, InteractionManager, PanResponder, Text, TouchableOpacity, View } from 'react-native'

import styles from '../styles'
import common from '../styles/common'
import Diamond from './Diamond'

export default class ItemRow extends Component {
  constructor(props) {
    super(props)
    const screen = Dimensions.get('window')
    this.state = {
      open: false,
      width: 0,
      height: 0,
      sensitivity: 5,
      screenWidth: screen.width,
      screenHeight: screen.height,
      circlePan: new Animated.Value(40),
      circleRowPan: new Animated.Value(0),
      circleOpacityPan: new Animated.Value(0),
      rowPan: new Animated.Value(0),
      opacityPan: new Animated.Value(0)
    }
  }

  _reset() {
    this.setState({ open: false })
    Animated.timing(this.state.circlePan, { toValue: 40, duration: 250 }).start()
    Animated.timing(this.state.circleRowPan, { toValue: 0, duration: 250 }).start()
    Animated.timing(this.state.circleOpacityPan, { toValue: 0, duration: 250 }).start()
    Animated.timing(this.state.rowPan, { toValue: 0, duration: 250 }).start()
    Animated.timing(this.state.opacityPan, { toValue: 0, duration: 250 }).start()
  }

  _open() {
    this.setState({ open: true })
    Animated.timing(this.state.circlePan, { toValue: 40, duration: 250 }).start()
    Animated.timing(this.state.circleRowPan, { toValue: -80, duration: 250 }).start()
    Animated.timing(this.state.circleOpacityPan, { toValue: 0, duration: 250 }).start()
    Animated.timing(this.state.rowPan, { toValue: -80, duration: 250 }).start()
    Animated.timing(this.state.opacityPan, { toValue: 1, duration: 250 }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) =>
        (Math.abs(gestureState.dx) > this.state.sensitivity &&
        Math.abs(gestureState.dy) < 6*this.state.sensitivity) ||
        Math.abs(gestureState.dx) > 50,
      onPanResponderGrant: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const max = this.state.screenWidth/2
        let dx = gestureState.dx
        if (this.state.open) dx -= 80

        // Row sliding
        this.state.rowPan.setValue(dx)
        if (dx <= 0) this.state.circleRowPan.setValue(dx)

        // Circle width
        if (dx >= 0) {
          let circleWidth = dx + 40
          if (circleWidth > max) circleWidth = max
          else if (circleWidth < 40) circleWidth = 40
          this.state.circlePan.setValue(circleWidth)
        }

        // Circle opacity
        let opacity = 1.5*dx/max
        if (opacity > 1) opacity = 1
        else if (opacity < 0) opacity = 0
        this.state.circleOpacityPan.setValue(opacity)

        // Side button opacity
        opacity = dx/-80
        if (opacity > 1) opacity = 1
        else if (opacity < 0) opacity = 0
        this.state.opacityPan.setValue(opacity)
      },
      onPanResponderRelease: (evt, gestureState) => {
        const max = this.state.screenWidth/2

        if (this.state.circlePan._value > 0.7*max || gestureState.vx > 1 && this.state.rowPan._value > 0) {
          // Swipe -->
          this._reset()
          this.onPress()
        }
        else if (this.state.rowPan._value < -50 || gestureState.vx > 1 && this.state.rowPan._value < 0) {
          // Swipe <--
          this._open()
        }
        else
          this._reset()
      },
      onPanResponderTerminate: () => this._reset()
    })
  }

  onPress = () => {
    this._reset()
    InteractionManager.runAfterInteractions(() => {
      this.props.onPress()
    })
  }

  onEditPress = () => {
    this._reset()
    InteractionManager.runAfterInteractions(() => {
      this.props.onEditPress()
    })
  }

  onDeletePress = () => {
    this._reset()
    InteractionManager.runAfterInteractions(() => {
      this.props.onDeletePress()
    })
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers} style={styles.itemRow}>
        <TouchableOpacity
          style={styles.itemRowCheck}
          onPress={this.onPress}
        >
          <Animated.View style={[styles.circle, this.props.complete && styles.circleActive, { width: this.state.circlePan, transform: [{ translateX: this.state.circleRowPan }] }]}>
            <Animated.Text style={[styles.circleText, this.props.complete && styles.circleTextActive, { opacity: this.state.circleOpacityPan }]}>
              {(this.props.complete)? '✕' : '✓'}
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>

        <Animated.View style={[styles.itemRowSection, { transform: [{ translateX: this.state.rowPan }] }]}>
          <TouchableOpacity
            onPress={this.onEditPress}
          >
            <Text style={styles.rowTitle}>{this.props.title}</Text>
            <View style={styles.rowSubtitle}>
              <Text style={styles.rowSubtitleText}>{this.props.points}</Text>
              <Diamond color={common.darkText} size={13} />
              <Text style={styles.rowSubtitleText}>pts</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.rowSlidein, { opacity: this.state.opacityPan }]} pointerEvents={(this.state.open)? 'auto' : 'none'}>
          <TouchableOpacity
            style={styles.rowSlideinButton}
            onPress={this.onEditPress}
          >
            <Text style={styles.rowSlideinButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowSlideinButton}
            onPress={this.onDeletePress}
          >
            <Text style={styles.rowSlideinButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}
