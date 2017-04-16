import React, { Component } from 'react'
import { ScrollView, TextInput, View } from 'react-native'

import common from '../styles/common'
import styles from '../styles'
import PillButton from './PillButton'
import PointSelector from './PointSelector'

export default class ItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title || '',
      points: this.props.points || 0
    }
  }

  validateFormCheck = () => {
    if (this.state.title.length === 0
      || !this.state.title.trim()
    ) return false
    return true
  }

  onPress = () => {
    let data = {
      title: this.state.title,
      points: this.state.points
    }
    if (this.props.mode == 'edit') this.props._update(data)
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
          <PointSelector
            value={this.state.points}
            set={(value) => this.setState({points: value})}
          />
        </View>
        <View style={styles.section}>
          <PillButton
            onPress={this.onPress}
            title={(this.props.mode == 'ADD')? 'Add' : 'Save'}
            disabled={!this.validateFormCheck() || this.props.addingItem || this.props.changingItem}
          />
        </View>
      </ScrollView>
    )
  }
}
