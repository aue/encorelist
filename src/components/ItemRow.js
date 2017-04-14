import React, { Component } from 'react'
import { Dimensions, Animated, PanResponder, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import common from '../styles/common'
import Diamond from './Diamond'

export default class ItemRow extends Component {
  constructor(props) {
    super(props)
    const screen = Dimensions.get('window')
    this.state = {
      width: 0,
      height: 0,
      screenWidth: screen.width,
      screenHeight: screen.height,
      buttonPan: new Animated.Value(40),
      buttonOpacityPan: new Animated.Value(0),
      textPan: new Animated.Value(0)
    }
  }

  _reset() {
    Animated.timing(this.state.buttonPan, { toValue: 0, duration: 250 }).start()
    Animated.timing(this.state.buttonOpacityPan, { toValue: 0, duration: 250 }).start()
    Animated.timing(this.state.textPan, { toValue: 0, duration: 250 }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.state.buttonPan.setOffset(40)
        this.state.buttonPan.setValue(0)
        this.state.textPan.setOffset(0)
        this.state.textPan.setValue(0)
      },
      onPanResponderMove: (evt, gestureState) => {
        let dx = gestureState.dx
        if (dx < 0) dx = 0
        const max = this.state.screenWidth/2

        // Text width
        this.state.textPan.setValue(dx)

        // Button width
        if (dx > max) dx = max
        this.state.buttonPan.setValue(dx)

        // Button opacity on width
        let opacity = 1.5*dx/max
        if (opacity > 1) opacity = 1
        else if (opacity < 0) opacity = 0
        this.state.buttonOpacityPan.setValue(opacity)
      },
      onPanResponderRelease: (evt, gestureState) => {
        this._reset()

        // Toggle if fits
        if (this.state.buttonPan._value > (this.state.screenWidth/2)*0.7 || gestureState.vx > 1) {
          this.props._toggle()
        }
      },
      onPanResponderTerminate: () => this._reset()
    })
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers} collapsable={false} style={styles.row}>
        <TouchableOpacity style={styles.check} onPress={() => this.props._toggle()}>
          <Animated.View style={[styles.circle, this.props.complete && styles.circleActive, { width: this.state.buttonPan }]}>
            <Animated.Text style={[styles.circleText, this.props.complete && styles.circleTextActive, { opacity: this.state.buttonOpacityPan }]}>
              {(this.props.complete)? '✕' : '✓'}
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.text}
          onPress={() => this.props._edit()}
          onLongPress={() => this.props._remove()}
        >
          <Animated.View style={{ transform: [{ translateX: this.state.textPan }] }}>
            <Text style={styles.title}>{this.props.title}</Text>
            <View style={styles.points}>
              <Text style={styles.pointsText}>{this.props.points}</Text>
              <Diamond style={styles.diamond} color="#777" size={13} />
              <Text style={styles.pointsText}>pts</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  check: {
    margin: 8,
    padding: 8,
    position: 'absolute',
    left: 0,
    zIndex: 1
  },
  text: {
    flex: 1,
    margin: 8,
    padding: 8,
    paddingRight: 16,
    marginLeft: 16 + 40 + 8,
    marginRight: 0
  },
  title: {
    fontSize: 20,
  },
  points: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
    marginTop: -2
  },

  circle: {
    backgroundColor: common.lightBackground,
    borderWidth: 2,
    borderColor: common.altPrimary,
    borderRadius: 25,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  circleActive: {
    backgroundColor: common.brandPrimary,
    borderColor: common.brandPrimary,
  },
  circleText: {
    color: common.mediumGrey,
    fontSize: 18,
    lineHeight: 29
  },
  circleTextActive: {
    color: common.lightText
  }
})
