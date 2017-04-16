import React, { Component } from 'react'
import { FlatList } from 'react-native'

import HeaderLists from './HeaderLists'
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

  renderHeader() {
    return (
      <HeaderLists
        points={this.props.accountPoints}
        object={this.props.object}
        empty={this.props.data.length < 1}
      />
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
        key={rowData.item.key}
        {...rowData.item}
        onPress={() => this.props.onRowPress(rowData.item.id, rowData.item.title)}
        onEditPress={() => this.props.onEditPress(rowData.item.id)}
        onDeletePress={() => this.props.onDeletePress(rowData.item.id)}
      />
    )
  }

  render() {
    if (this.props.loading) return <PointRowLoading />

    return (
      <FlatList
        data={this.props.data}
        ListHeaderComponent={this.renderHeader.bind(this)}
        ListFooterComponent={this.renderFooter.bind(this)}
        renderItem={this.renderRow.bind(this)}
      />
    )
  }
}
