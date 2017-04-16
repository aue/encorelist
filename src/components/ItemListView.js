import React, { Component } from 'react'
import { FlatList } from 'react-native'

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

  renderHeader = () => {
    return (
      <HeaderItems
        totalPoints={this.props.totalPoints}
        completedPoints={this.props.completedPoints}
        empty={this.props.data.length < 1}
      />
    )
  }

  renderFooter = () => {
    return (
      <ItemRowAdd
        onPress={this.props.onAddPress}
      />
    )
  }

  renderRow = (rowData) => {
    return (
      <ItemRow
        key={rowData.item.key}
        {...rowData.item}
        onPress={() => this.props.onRowPress(rowData.item.id, rowData.item.complete, rowData.item.points)}
        onEditPress={() => this.props.onEditPress(rowData.item)}
        onDeletePress={() => this.props.onDeletePress(rowData.item.id)}
      />
    )
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        renderItem={this.renderRow}
      />
    )
  }
}
