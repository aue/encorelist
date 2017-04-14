import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from '../styles'
import Diamond from './Diamond'

export default class ListsHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A54348', '#E4598C']} style={[styles.container, styles.header]}>
        <View style={styles.section}>
          <Text style={[styles.title, styles.whiteColor]}>At a glance</Text>
          <View style={styles.pointsDisplay}>
            <Text style={[styles.pointsDisplayText, styles.whiteColor]}>{this.props.points || 0}</Text>
            <Diamond size={27} />
            <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold, styles.whiteColor]}>pts</Text>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
