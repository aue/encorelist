import React, { Component } from 'react'
import { Alert, InteractionManager } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import * as ItemsActions from '../actions/items'

import ItemRowLoading from '../components/ItemRowLoading'
import ItemListView from '../components/ItemListView'

class ItemsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderPlaceholderOnly: true
    }
  }

  gotoToggleItem(itemId, complete, points) {
    this.props.toggleListItem(this.props.listId, itemId, !complete, points)
  }

  gotoEditItem(data) {
    Actions.itemDetails({
      params: {
        listId: this.props.listId,
        id: data.id,
        title: data.title,
        points: data.points
      },
      title: 'Edit Item',
      direction: 'vertical',
      backTitle: 'Cancel',
      hideBackImage: true
    })
  }

  gotoDeleteItem(itemId) {
    Alert.alert(
      'Delete this item',
      'This item will be deleted from this list.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeListItem(itemId, this.props.listId), style: 'destructive'},
      ]
    )
  }

  gotoAddItem() {
    Actions.itemDetails({
      params: { listId: this.props.listId },
      title: 'Add Item',
      direction: 'vertical',
      backTitle: 'Cancel',
      hideBackImage: true
    })
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false})

      if (this.props.listId) {
        this.props.getListItems(this.props.listId)
      }
    })
  }

  render() {
    if (this.state.renderPlaceholderOnly || this.props.loading) {
      return <ItemRowLoading />
    }

    return (
      <ItemListView
        data={this.props.items}
        totalPoints={this.props.totalPoints}
        completedPoints={this.props.completedPoints}
        loading={this.props.loading}
        onRowPress={this.gotoToggleItem.bind(this)}
        onEditPress={this.gotoEditItem.bind(this)}
        onDeletePress={this.gotoDeleteItem.bind(this)}
        onAddPress={this.gotoAddItem.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeList = {
    listId: null,
    title: '',
    items: [],
    totalPoints: 0,
    completedPoints: 0
  }

  // if a listId has been passed in
  let listId = ownProps.params.listId
  if (listId) {
    let list = state.lists.lists[listId]
    activeList.listId = listId
    activeList.title = list.title
    activeList.totalPoints = list.totalPoints
    activeList.completedPoints = list.completedPoints

    let itemIds = Object.keys(list.items)
    if (itemIds.length > 0) {
      activeList.items = itemIds
        .map(itemId => state.items.items[itemId])
        .filter(value => value !== null)
    }
  }

  return {
    listId: activeList.listId,
    title: activeList.title,
    items: activeList.items,
    totalPoints: activeList.totalPoints,
    completedPoints: activeList.completedPoints,
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
