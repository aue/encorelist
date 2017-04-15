import React, { Component } from 'react'
import { ListView } from 'react-native'

import HeaderItems from './HeaderItems'
import ItemRow from './ItemRow'
import ItemRowAdd from './ItemRowAdd'

export default class ItemListView extends Component {
  constructor(props) {
    super(props)
    /*
    data
    loading
    onRowPress
    onEditPress
    onDeletePress
    onAddPress
    */
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.data)
  }

  componentWillReceiveProps(nextProps) {
    this.dataSource = this.dataSource.cloneWithRows(nextProps.data)
  }

  renderHeader() {
    return (
      <HeaderItems
        totalPoints={this.props.totalPoints}
        completedPoints={this.props.completedPoints}
        empty={this.props.data.length < 1}
      />
    )
  }

  renderFooter() {
    return (
      <ItemRowAdd
        onPress={this.props.onAddPress}
      />
    )
  }

  renderRow(rowData) {
    return (
      <ItemRow
        {...rowData}
        onPress={() => this.props.onRowPress(rowData.id, rowData.complete, rowData.points)}
        onEditPress={() => this.props.onEditPress(rowData)}
        onDeletePress={() => this.props.onDeletePress(rowData.id)}
      />
    )
  }

  render() {
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
