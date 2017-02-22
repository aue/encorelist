import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ListsHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#DDD', '#EEE']} style={styles.header}>
        <Text style={styles.title}>Hi {this.props.name}! At a glance</Text>
        <Text style={styles.text}>{this.props.points} points</Text>
        <Text style={styles.title}>Your next item</Text>
        <Text style={styles.text}>Some item/task</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#363636',
  },
  text: {
    fontSize: 25,
    color: '#363636',
  },
});
