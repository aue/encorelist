import React, { Component } from 'react'
import { Animated, PanResponder, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import CheckCircle from './CheckCircle'

export default class ItemRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scaleY: new Animated.Value(1),
      pan: new Animated.ValueXY()
    }
  }

  _reset() {
    Animated.timing(this.state.pan, {
      toValue: {x: 0, y: 0},
      duration: 250
    }).start()
  }

  _checkForRemoval() {
    this.state.pan.flattenOffset()
    let x = this.state.pan.x._value
    if (Math.abs(x) > 50) {
      this.refs.wrapper.measure((ox, oy, width) => {
        let newX
        if (x > 0) {
          newX = width
        } else {
          newX = -2 * width
        }

        Animated.sequence([
          Animated.timing(this.state.pan, {
            toValue: {x: newX, y: 0},
            duration: 250
          }),
          Animated.timing(this.state.pan, {
            toValue: {x: 0, y: 0},
            duration: 0
          })
        ]).start(() => {
          this.props._remove()
        })
      })
    } else {
      this._reset()
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({x: this.state.pan.x._value})
        this.state.pan.setValue({x: 0})
      },
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: () => this._reset(),
      onPanResponderTerminate: () => this._reset()

      //onPanResponderRelease: () => this._checkForRemoval(),

      //onPanResponderTerminate: () => this._checkForRemoval()
    })
  }

  render() {
    const { pan, scaleY } = this.state
    const translateX = pan.x

    const animatedCardStyles = {transform: [{translateX}, {scaleY}]}
    const wrapperStyles = {
      backgroundColor: '#00AA00',
      transform: [{scaleY}]
    }
    //

    return (
      <Animated.View {...this._panResponder.panHandlers} ref="wrapper" collapsable={false} style={styles.row}>
        <TouchableOpacity style={styles.check} onPress={() => this.props._toggle()}>
          <CheckCircle checked={this.props.complete} />
        </TouchableOpacity>
        <View style={styles.text}>
          <Animated.View style={animatedCardStyles}>
            <TouchableOpacity onPress={() => this.props._edit()}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.points}>{this.props.points} Points</Text>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.separator} />
        </View>
      </Animated.View>
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
    padding: 16,
    width: 40,
    flex: 0
  },
  text: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    paddingTop: 16,
    paddingRight: 16
  },
  points: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 16,
    paddingRight: 16,
    fontSize: 15
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
})
