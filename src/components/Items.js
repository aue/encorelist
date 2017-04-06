import React, { Component } from 'react'
import { ListView } from 'react-native'
import ItemRow from './ItemRow'

export default class Items extends Component {
  constructor(props) {
    super(props)
  }

  renderRow(rowData) {
    return (
      <ItemRow
        {...rowData}
        _toggle={() => this.props._toggle(rowData.id, rowData.complete)}
        _edit={() => this.props._edit(rowData)}
        _remove={() => this.props._remove(rowData.id)}
      />
    )
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.items)
  }

  componentWillReceiveProps(nextProps) {
    // Populate list with items
    if (this.props.items !== nextProps.items) {
      this.dataSource = this.dataSource.cloneWithRows(nextProps.items)
    }
  }

  render() {
    return (
      <ListView
        style={{ backgroundColor: '#fff' }}
        dataSource={this.dataSource}
        enableEmptySections={true}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }
}
