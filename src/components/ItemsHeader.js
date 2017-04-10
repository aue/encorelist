import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Diamond from './Diamond'

export default class ItemsHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A54348', '#E4598C']} style={styles.header}>
        <Text style={styles.title}>Points earned</Text>
        <View style={styles.points}>
          <Text style={[styles.text, styles.pointsCount]}>{this.props.completedPoints || 0} of {this.props.totalPoints || 0}</Text>
          <Diamond style={styles.diamond} size={27} />
          <Text style={[styles.text, styles.pts]}>pts</Text>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 2,
    color: '#FFF',
    backgroundColor: 'transparent'
  },
  points: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diamond: {
    marginTop: 1
  },
  pointsCount: {
    marginRight: 6
  },
  pts: {
    marginLeft: 2,
    fontWeight: '600'
  },
  text: {
    fontSize: 35,
    color: '#FFF',
    backgroundColor: 'transparent'
  },
  spacer: {
    height: 16
  }
})
