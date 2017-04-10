import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import PointCircle from './PointCircle'
import Diamond from './Diamond'

export default class ListsRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let numberOfItems = 0
    if (this.props.items) numberOfItems = Object.keys(this.props.items).length
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.props.gotoList(this.props.id, this.props.title)}
        onLongPress={() => this.props.gotoRemoveList(this.props.id)}
      >
        <View style={styles.circle}>
          <PointCircle value={this.props.completedPoints} />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.points}>
            <Text style={styles.pointsText}>{numberOfItems} {(numberOfItems == 1)? 'Item':'Items'}, {this.props.totalPoints}</Text>
            <Diamond style={styles.diamond} color="#777" size={13} />
            <Text style={styles.pointsText}>pts</Text>
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
  },
  pointsText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
    marginTop: -2
  }
})
