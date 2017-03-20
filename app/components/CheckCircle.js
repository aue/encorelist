import React, { Component } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'

export default class CheckCircle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let pan = this.props.pan
    pan.setOffset({x: 40, y: 40})
    let style = {
      width: pan.x
    }
    console.log(pan.getLayout())

    return (
      <Animated.View style={[styles.circle, this.props.checked && styles.activeCircle, style]}>
        <Text style={styles.text}></Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'darkred',
    borderRadius: 25,
    height: 40,
    width: 40,
    padding: 10,
  },
  activeCircle: {
    backgroundColor: 'darkred',
  }
})
