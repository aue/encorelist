import React, { Component } from 'react'
import { ListView, Text } from 'react-native'

import styles from '../styles'

import ListsHeader from './ListsHeader'
import PointRow from './PointRow'
import PointRowLoading from './PointRowLoading'
import PointRowAdd from './PointRowAdd'

export default class PointListView extends Component {
  constructor(props) {
    super(props)
    /*
    object
    data
    loading
    onRowPress
    onEditPress
    onDeletePress
    onAddPress
    */
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentWillReceiveProps(nextProps) {
    this.dataSource = this.dataSource.cloneWithRows(nextProps.data)
  }

  renderHeader() {
    if (this.props.data.length > 0)
      return (
        <ListsHeader points={this.props.accountPoints} />
      )
    else
      return (
        <Text style={styles.message}>
          Add a {this.props.object} and start earning points!
        </Text>
      )
  }

  renderFooter() {
    return (
      <PointRowAdd
        object={this.props.object}
        onPress={this.props.onAddPress}
      />
    )
  }

  renderRow(rowData) {
    return (
      <PointRow
        {...rowData}
        onPress={() => this.props.onRowPress(rowData.id)}
        onEditPress={() => this.props.onEditPress(rowData.id)}
        onDeletePress={() => this.props.onDeletePress(rowData.id)}
      />
    )
  }

  render() {
    if (this.props.loading) return <PointRowLoading />

    return (
      <ListView
        dataSource={this.dataSource}
        enableEmptySections={true}
        renderHeader={this.renderHeader.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }
}
