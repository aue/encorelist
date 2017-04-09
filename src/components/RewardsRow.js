import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import PointCircle from './PointCircle'
import Diamond from './Diamond'

export default class RewardsRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.row}
        onLongPress={() => this.props.gotoRemoveReward(this.props.id)}
      >
        <View style={styles.circle}>
          <PointCircle />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.points}>
            <Text style={styles.pointsText}>{this.props.pointCost}</Text>
            <Diamond style={styles.diamond} color="#777" size={13} />
          </View>
        </View>
      </TouchableOpacity>
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
  circle: {
    margin: 8,
    padding: 8
  },
  text: {
    flex: 1,
    margin: 8,
    padding: 8,
    marginLeft: 0,
    paddingLeft: 0,
  },
  title: {
    fontSize: 20,
  },
  points: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  }
})
