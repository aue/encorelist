import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Diamond from './Diamond'

export default class PointCircle extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    console.log(`${100 * (1 - this.props.percentage)}%`)
    return (
      <View>
        <View style={styles.circle}>
          <Text style={styles.text}>{this.props.value}</Text>
          <Diamond style={styles.diamond} size={16} />
        </View>
        <View style={styles.circleTop}>
          <View style={[styles.circle, styles.circleGray]}>
            <Text style={styles.text}>{this.props.value}</Text>
            <Diamond style={styles.diamond} size={16} />
          </View>
        </View>
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
  },
  circleTop: {
    position: 'absolute',
    height: 0
  },
  circleGray: {
    backgroundColor: 'gray'
  }
})
