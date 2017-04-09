import React, { Component } from 'react'
import { ListView, StyleSheet, Text } from 'react-native'

import ListsHeader from './ListsHeader'
import ListsRow from './ListsRow'
import ListsRowPlaceholder from '../components/ListsRowPlaceholder'

export default class Lists extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lists !== nextProps.lists) {
      this.dataSource = this.dataSource.cloneWithRows(nextProps.lists)
    }
  }

  render() {
    if (this.props.loading) return <ListsRowPlaceholder />
    else if (this.props.lists.length < 1) return (
      <Text style={styles.message}>
        No lists :(
      </Text>
    )

    return (
      <ListView
        dataSource={this.dataSource}
        enableEmptySections={true}
        renderHeader={() => <ListsHeader />}
        renderFooter={() => <ListsHeader />}
        renderRow={(rowData) => <ListsRow {...rowData} navigateToList={this.props.navigateToList} removeList={this.props.removeList} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  message: {
    padding: 16
  }
})
