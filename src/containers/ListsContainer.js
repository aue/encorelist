import React, { Component } from 'react'
import { Alert, InteractionManager } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { auth } from '../firebase'

import * as ListsActions from '../actions/lists'

import PointListView from '../components/PointListView'

class ListsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderPlaceholderOnly: true
    }
  }

  gotoList(listId, title) {
    Actions.items({ params: { listId, title }, title, backTitle: 'Lists' })
  }

  gotoEditList(listId) {
    Actions.listDetails({
      params: { listId },
      title: 'Edit List',
      direction: 'vertical',
      backTitle: 'Cancel',
      hideBackImage: true
    })
  }

  gotoDeleteList(listId) {
    Alert.alert(
      'Delete this list',
      'All items in this list will be deleted.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeList(listId), style: 'destructive'},
      ]
    )
  }

  gotoAddList() {
    Actions.listDetails({
      params: { },
      title: 'Add List',
      direction: 'vertical',
      backTitle: 'Cancel',
      hideBackImage: true
    })
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false})

      if (auth.currentUser && !this.props.init) {
        this.props.getUserLists(auth.currentUser.uid)
      }
    })
  }

  render() {
    return (
      <PointListView
        data={this.props.lists}
        accountPoints={this.props.accountPoints}
        object="list"
        loading={this.state.renderPlaceholderOnly || this.props.loading}
        onRowPress={this.gotoList.bind(this)}
        onEditPress={this.gotoEditList.bind(this)}
        onDeletePress={this.gotoDeleteList.bind(this)}
        onAddPress={this.gotoAddList.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let lists = Object.values(state.lists.lists)
  if (lists.length > 0) {
    lists = lists.map(list => {
      let numberOfItems = Object.keys(list.items).length
      return {
        key: list.id,
        id: list.id,
        title: list.title,
        subtitle: `${numberOfItems} ${(numberOfItems == 1)? 'Item' : 'Items'}`,
        value: list.totalPoints
      }
    })
  }

  return {
    lists: lists,
    accountPoints: state.account.points,
    init: state.lists.init,
    loading: state.lists.loadingListIds || state.lists.loadingLists,
    error: state.lists.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer)
