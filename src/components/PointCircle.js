import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Diamond from './Diamond'

export default class PointCircle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || 0
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.circle}>
        <Text style={styles.text}>{this.state.value}</Text>
        <Diamond style={styles.diamond} size={16} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'darkred',
    borderRadius: 30,
    height: 60,
    width: 60,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 2,
  },
  diamond: {
    marginTop: 1
  }
})
