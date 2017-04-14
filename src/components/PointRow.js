import React, { Component } from 'react'
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import common from '../styles/common'

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
      textPan: new Animated.Value(0),
      slidePan: new Animated.Value(0)
    }
  }

  _reset() {
    this.setState({
      open: false
    })

    Animated.timing(this.state.textPan, {
      toValue: 0,
      duration: 250
    }).start()

    Animated.timing(this.state.slidePan, {
      toValue: 0,
      duration: 250
    }).start()
  }

  _open() {
    this.setState({
      open: true
    })

    Animated.timing(this.state.textPan, {
      toValue: -80,
      duration: 250
    }).start()

    Animated.timing(this.state.slidePan, {
      toValue: 1,
      duration: 250
    }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        /*if (this.state.open) {
          this.state.textPan.setValue(-80)
          this.state.slidePan.setValue(1)
        }
        else {
          this.state.textPan.setValue(0)
          this.state.slidePan.setValue(0)
        }
        this.state.textPan.setOffset(0)
        this.state.slidePan.setOffset(0)*/
      },
      onPanResponderMove: (evt, gestureState) => {
        let dx = gestureState.dx
        if (this.state.open) dx -= 80

        // Text width
        this.state.textPan.setValue(dx)

        // Slide
        let opacity = dx/-80
        if (opacity > 1) opacity = 1
        else if (opacity < 0) opacity = 0
        this.state.slidePan.setValue(opacity)
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Toggle if fits
        if (this.state.textPan._value < -80 || gestureState.vx > 1 && this.state.textPan._value < 0) {
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
        <Animated.View style={{ transform: [{ translateX: this.state.textPan }] }}>
          <TouchableOpacity
            style={styles.pointRow}
            onPress={() => { this.props.onPress(); this._reset() }}
          >
            <View style={styles.pointRowCircle}>
              <PointCircle value={this.props.value} percentage={this.props.percentage} />
            </View>
            <View style={styles.pointRowSection}>
              <Text style={styles.pointRowTitle}>{this.props.title}</Text>
              <View style={styles.pointRowSubtitle}>
                <Text style={styles.pointRowSubtitleText}>{this.props.subtitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.pointRowSlidein, { opacity: this.state.slidePan }]} pointerEvents={(this.state.open)? 'auto' : 'none'}>
          <TouchableOpacity
            style={styles.pointRowSlideinButton}
            onPress={() => { this.props.onEditPress(); this._reset() }}
          >
            <Text style={styles.pointRowSlideinButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pointRowSlideinButton}
            onPress={() => { this.props.onDeletePress(); this._reset() }}
          >
            <Text style={styles.pointRowSlideinButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pointRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: common.lightBackground
  },
  pointRowCircle: {
    margin: 8,
    padding: 8
  },
  pointRowSection: {
    flex: 1,
    margin: 8,
    padding: 8,
    marginLeft: 0,
    paddingLeft: 0
  },
  pointRowTitle: {
    fontSize: 20
  },
  pointRowSubtitle: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointRowSubtitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
    marginTop: -2
  },
  pointRowSlidein: {
    position: 'absolute',
    padding: 12,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointRowSlideinButton: {
    margin: 4
  },
  pointRowSlideinButtonText: {
    backgroundColor: common.mediumGrey,
    color: common.white,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30
  }
})
