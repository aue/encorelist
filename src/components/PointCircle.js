import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class PointCircle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.circle}>
        <Text style={styles.text}>{this.props.number}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkred',
    borderRadius: 76/2,
    height: 75,
    width: 75,
    padding: 10,
  },
  text: {
    color: '#FFF',
  }
});

export default PointCircle;
