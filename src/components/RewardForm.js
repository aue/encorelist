import React, { Component } from 'react'
import { StyleSheet, ScrollView, TextInput, Button } from 'react-native'

import PointSelector from './PointSelector'

export default class RewardForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title || '',
      pointCost: this.props.pointCost || 0,
      height: 0
    }
  }

  _press() {
    let data = {
      title: this.state.title,
      pointCost: this.state.pointCost
    }
    if (this.props.mode == 'edit') this.props._update(data)
    else this.props._add(data)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Title"
          multiline={true}
          style={[styles.title, {height: Math.max(40, this.state.height)}]}
          value={this.state.title}
          onChangeText={(value) => this.setState({title: value})}
          onContentSizeChange={(event) => {
            this.setState({height: event.nativeEvent.contentSize.height})
          }}
        />
        <PointSelector
          value={this.state.pointCost}
          set={(value) => this.setState({pointCost: value})}
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
    fontSize: 20,
    height: 40
  },
  points: {
    fontSize: 20,
    height: 40
  },
  button: {
    marginTop: 16
  }
})
