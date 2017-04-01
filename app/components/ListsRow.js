import React, { Component } from 'react'
import { Animated, PanResponder, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'

export default class ListsRow extends Component {
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
          this.goToList()
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

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),

      onPanResponderRelease: () => this._checkForRemoval(),

      onPanResponderTerminate: () => this._checkForRemoval()
    })
  }

  goToList() {
    this.props.navigateToList(this.props.id, this.props.title)
  }

  render() {
    const { pan, scaleY } = this.state
    const translateX = pan.x

    const animatedCardStyles = {transform: [{translateX}, {scaleY}]}
    const wrapperStyles = {
      backgroundColor: '#00AA00',
      transform: [{scaleY}]
    }

    return (
      <Animated.View style={wrapperStyles}>
        <View ref="wrapper" collapsable={false}>
          <Animated.View style={animatedCardStyles} {...this._panResponder.panHandlers}>
            <TouchableOpacity style={styles.row} onPress={() => this.goToList()}>
              <Text style={styles.title}>{this.props.title}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </Animated.View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  title: {
    flex: 1,
    fontSize: 20
  },
  points: {
    flex: 1,
    fontSize: 15
  }
})
