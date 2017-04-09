import React, { Component } from 'react'
import { ListView, StyleSheet, Text } from 'react-native'

import RewardsHeader from './RewardsHeader'
import RewardsRow from './RewardsRow'
import RewardsAddRow from './RewardsAddRow'
import RewardsRowPlaceholder from '../components/RewardsRowPlaceholder'

export default class Rewards extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rewards !== nextProps.rewards) {
      this.dataSource = this.dataSource.cloneWithRows(nextProps.rewards)
    }
  }

  render() {
    if (this.props.loading) return <RewardsRowPlaceholder />

    let header
    if (this.props.rewards.length < 1) {
      header = (
        <Text style={styles.message}>
          No rewards :(
        </Text>
      )
    }
    else {
      header = (
        <RewardsHeader/>
      )
    }

    return (
      <ListView
        dataSource={this.dataSource}
        enableEmptySections={true}
        renderHeader={() => header}
        renderFooter={() => <RewardsAddRow gotoAddReward={this.props.gotoAddReward} />}
        renderRow={(rowData) => <RewardsRow {...rowData} gotoRemoveReward={this.props.gotoRemoveReward} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  message: {
    padding: 16
  }
})
