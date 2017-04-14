import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

//import styles from '../styles'
import PointCircle from './PointCircle'

export default class PointRow extends Component {
  constructor(props) {
    super(props)
    /*
    title
    subtitle
    value
    outOfValue
    onPress
    onLongPress
    */
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.pointRow}
        onPress={() => this.props.onPress()}
        onLongPress={() => this.props.onLongPress()}
      >
        <View style={styles.pointRowCircle}>
          <PointCircle value={this.props.value} percentage={this.props.percentage} />
        </View>
        <View style={styles.pointRowSection}>
          <Text style={styles.pointRowTitle}>{this.props.title}</Text>
          <View style={styles.pointRowSubtitle}>
            <Text style={styles.pointRowSubtitleText}>{this.props.subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  pointRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  pointRowCircle: {
    margin: 8,
    padding: 8
  },
  pointRowSection: {
    flex: 1,
    margin: 8,
    padding: 8,
    marginLeft: 0,
    paddingLeft: 0
  },
  pointRowTitle: {
    fontSize: 20
  },
  pointRowSubtitle: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointRowSubtitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
    marginTop: -2
  }
})
