import React, { Component } from 'react'
import { Dimensions, Animated, PanResponder, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import CheckCircle from './CheckCircle'

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
      textPan: new Animated.Value(0)
    }
  }

  _reset() {
    Animated.timing(this.state.buttonPan, {
      toValue: 0,
      duration: 250
    }).start()

    Animated.timing(this.state.textPan, {
      toValue: 0,
      duration: 250
    }).start()
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
        //console.log(gestureState.vx)
        let dx = gestureState.dx
        if (dx < 0) dx = 0

        // Text width
        this.state.textPan.setValue(dx)

        // Button width
        if (dx > this.state.screenWidth/2) dx = this.state.screenWidth/2
        this.state.buttonPan.setValue(dx)
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
      <View {...this._panResponder.panHandlers} ref="wrapper" collapsable={false} style={styles.row}>
        <TouchableOpacity style={styles.check} onPress={() => this.props._toggle()}>
          <Animated.View style={{ width: this.state.buttonPan }}>
            <CheckCircle checked={this.props.complete} />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.text} onPress={() => this.props._edit()}>
          <Animated.View style={{ transform: [{ translateX: this.state.textPan }] }}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.points}>{this.props.points} Points</Text>
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
    paddingTop: 4,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
