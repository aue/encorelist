import React, { Component } from 'react'
import { StyleSheet, ScrollView, TextInput, View, Button } from 'react-native'

export default class ItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemTitle: this.props.title,
      itemPoints: this.props.points,
      height: 0
    }
  }

  _press() {
    let data = {
      title: this.state.itemTitle,
      points: this.state.itemPoints
    }
    if (this.props.mode == 'edit') this.props._update(data)
    else this.props._add(data)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Add item"
          multiline={true}
          style={[styles.title, {height: Math.max(35, this.state.height)}]}
          value={this.state.itemTitle}
          onChangeText={(value) => this.setState({itemTitle: value})}
          onContentSizeChange={(event) => {
            this.setState({height: event.nativeEvent.contentSize.height})
          }}
        />
        <TextInput
          placeholder="Points"
          style={styles.points}
          keyboardType="numeric"
          value={this.state.itemPoints}
          onChangeText={(value) => this.setState({itemPoints: value})}
        />
        <Button
          onPress={() => this._press()}
          style={styles.button}
          title={(this.props.mode == 'add')? 'Add' : 'Save'}
          disabled={this.props.addingItem || this.props.changingItem}
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
