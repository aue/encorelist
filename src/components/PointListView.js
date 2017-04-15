import React, { Component } from 'react'
import { ListView } from 'react-native'

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

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.data)
  }

  componentWillReceiveProps(nextProps) {
    this.dataSource = this.dataSource.cloneWithRows(nextProps.data)
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
        {...rowData}
        onPress={() => this.props.onRowPress(rowData.id, rowData.title)}
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
