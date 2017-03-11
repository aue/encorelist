import React, { Component } from 'react'
import { Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import List from '../components/List'
import * as ItemsActions from '../actions/items'

class ItemsContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'List',
    header: ({ state, setParams, navigate }) => {
      // The navigation prop has functions like setParams, goBack, and navigate.
      let right = (
        <Button
          title="Add"
          onPress={() => navigate('ListAdd', {
            state,
          })}
        />
      )
      return { right }
    },
  }

  _add(title, points) {
    this.props.addListItem(title, points, this.props.listId)
  }

  _remove(itemId) {
    this.props.removeListItem(itemId, this.props.listId)
  }

  componentWillMount() {
    let listId = this.props.navigation.state.params.listId || '';
    this.props.getListItems(listId)
  }

  componentWillReceiveProps(nextProps) {
    /*if (this.props.lists !== nextProps.lists) {
      this.dataSource = this.dataSource.cloneWithRows(nextProps.lists)
    }*/
  }

  render() {
    console.log(this.props)
    const { navigate } = this.props.navigation
    return (
      <List {...this.props} _add={this._add.bind(this)} _remove={this._remove.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listId: state.items.listId,
    itemIds: state.items.itemIds,
    items: state.items.items,
    loadingItemIds: state.items.loadingItemIds,
    loadingItems: state.items.loadingItems,
    error: state.items.error,
    addingItem: state.items.addingItem,
    removingItem: state.items.removingItem,
    changingItem: state.items.changingItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ItemsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer)
