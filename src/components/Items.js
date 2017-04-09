import React, { Component } from 'react'
import { StyleSheet, Text, ListView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ItemRowPlaceholder from './ItemRowPlaceholder'
import ItemsHeader from './ItemsHeader'
import ItemsRow from './ItemsRow'
import ItemsAddRow from './ItemsAddRow'

export default class Items extends Component {
  constructor(props) {
    super(props)
  }

  renderRow(rowData) {
    return (
      <ItemsRow
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
    if (this.props.loading) return <ItemRowPlaceholder />

    let header = null
    if (this.props.items.length === 0) {
      header = (
        <Text style={styles.header}>
          No items in this list :(
        </Text>
      )
    }
    else {
      header = (
        <ItemsHeader/>
      )
    }

    return (
      <ListView
        style={{ backgroundColor: '#fff' }}
        dataSource={this.dataSource}
        enableEmptySections={true}
        renderHeader={() => header}
        renderFooter={() => <ItemsAddRow addItem={this.props.addItem.bind(this)} />}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F6F6F6'
  },
  header: {
    padding: 16
  },
  new: {
    flex: 0
  },
  newItem: {
    backgroundColor: '#FFFFFF',
    height: 42,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20
  },
  offline: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
})
