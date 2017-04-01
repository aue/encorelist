import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class PointSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value || 0
    }
  }

  increase(amount = 1) {
    let newValue = this.state.value + amount
    this.setState({ value: newValue })
    this.props.set(newValue)
  }

  decrease(amount = 1) {
    let newValue = this.state.value - amount
    this.setState({ value: newValue })
    this.props.set(newValue)
  }

  change(amount = 0) {
    let newValue = amount
    this.setState({ value: newValue })
    this.props.set(newValue)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.decrease()}
          style={styles.button}
          title='-'
          disabled={this.state.value < 1}
        />
        <Text style={styles.number}>{this.state.value}</Text>
        <Button
          onPress={() => this.increase()}
          style={styles.button}
          title='+'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    width: 100,
    textAlign: 'center'
  },
  button: {
  }
})
