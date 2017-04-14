import React, { Component } from 'react'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import * as ItemsActions from '../actions/items'

import ItemListView from '../components/ItemListView'

class ItemsContainer extends Component {
  constructor(props) {
    super(props)
  }

  addItem() {
    Actions.itemDetails({ params: { listId: this.props.listId }, title: 'Add Item' })
  }

  _remove(itemId) {
    Alert.alert(
      'Delete this item?',
      'Points from this item will be removed',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeListItem(itemId, this.props.listId), style: 'destructive'},
      ]
    )
  }

  _toggle(itemId, complete, points) {
    this.props.toggleListItem(this.props.listId, itemId, !complete, points)
  }

  _edit(data) {
    Actions.itemDetails({ params: {
      listId: this.props.listId,
      id: data.id,
      title: data.title,
      points: data.points
    }, title: 'Edit Item' })
  }

  componentWillMount() {
    let listId = this.props.params.listId || null
    if (listId) {
      this.props.getListItems(listId).then(() => {
        //setParams({title: this.props.title})
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    let listId = nextProps.params.listId
    if (this.props.params.listId != listId && listId != null) {
      this.props.getListItems(listId).then(() => {
        //setParams({title: this.props.title})
      })
    }
  }

  render() {
    return (
      <ItemListView
        data={this.props.items}
        totalPoints={this.props.totalPoints}
        completedPoints={this.props.completedPoints}
        loading={this.props.loading}
        onRowPress={this._toggle.bind(this)}
        onEditPress={this._edit.bind(this)}
        onDeletePress={this._remove.bind(this)}
        onAddPress={this.addItem.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let items = []
  let activeList = {
    title: '',
    totalPoints: 0,
    completedPoints: 0
  }
  if (state.items.activeListId && !(state.items.loadingItemIds || state.items.loadingItems)) {
    if (Object.keys(state.lists.lists[state.items.activeListId].items).length > 0)
      items = Object.keys(state.lists.lists[state.items.activeListId].items)
        .map(itemId => state.items.items[itemId])
        .filter(value => value !== null)

    activeList = {
      ...activeList,
      ...state.lists.lists[state.items.activeListId]
    }
  }

  return {
    title: activeList.title,
    totalPoints: activeList.totalPoints,
    completedPoints: activeList.completedPoints,
    listId: state.items.activeListId,
    items: items,
    loading: state.items.loadingItemIds || state.items.loadingItems,
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
