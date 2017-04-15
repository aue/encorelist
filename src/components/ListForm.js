import React, { Component } from 'react'
import { ScrollView, TextInput, View } from 'react-native'

import common from '../styles/common'
import styles from '../styles'
import PillButton from './PillButton'

export default class ListForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title
    }
  }

  onPress = () => {
    let data = {
      title: this.state.title,
    }
    if (this.props.mode == 'EDIT') this.props._update(data)
    else this.props._add(data)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <TextInput
            placeholder="Title"
            underlineColorAndroid={common.brandPrimary}
            style={styles.formInput}
            value={this.state.title}
            onChangeText={(value) => this.setState({title: value})}
          />
        </View>
        <View style={styles.section}>
          <PillButton
            onPress={this.onPress}
            title={(this.props.mode == 'ADD')? 'Add' : 'Save'}
            disabled={this.props.adding || this.props.changing}
          />
        </View>
      </ScrollView>
    )
  }
}
