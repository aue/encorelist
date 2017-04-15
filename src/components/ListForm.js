import React, { Component } from 'react'
import { StyleSheet, ScrollView, TextInput, Button } from 'react-native'

export default class ListForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title,
      height: 0
    }
  }

  _press() {
    let data = {
      title: this.state.title,
    }
    if (this.props.mode == 'edit') this.props._update(data)
    else this.props._add(data)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Name"
          multiline={true}
          style={[styles.title, {height: Math.max(35, this.state.height)}]}
          value={this.state.title}
          onChangeText={(value) => this.setState({title: value})}
          onContentSizeChange={(event) => {
            this.setState({height: event.nativeEvent.contentSize.height})
          }}
        />
        <Button
          onPress={() => this._press()}
          style={styles.button}
          title={(this.props.mode == 'add')? 'Add' : 'Save'}
          disabled={this.props.adding || this.props.changing}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 20
  },
  points: {
    fontSize: 20
  },
  button: {
    marginTop: 16
  }
})
