import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class CheckCircle extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={[styles.circle, this.props.checked && styles.activeCircle]}>
        <Text style={styles.text}></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'darkred',
    borderRadius: 25,
    height: 40,
    width: '100%',
    padding: 10,
  },
  activeCircle: {
    backgroundColor: 'darkred',
  }
})
