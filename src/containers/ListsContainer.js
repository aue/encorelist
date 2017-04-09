import React, { Component } from 'react'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { auth } from '../firebase'

import Lists from '../components/Lists'
import * as ListsActions from '../actions/lists'

class ListsContainer extends Component {
  constructor(props) {
    super(props)
  }

  gotoList(listId, title) {
    Actions.items({ params: { listId, title }, title })
  }

  gotoAddList() {
    Actions.listDetails({ params: {}, title: 'Add List' })
  }

  gotoRemoveList(listId) {
    Alert.alert(
      'Delete this list?',
      'All items will be removed',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeList(listId), style: 'destructive'},
      ]
    )
  }

  componentWillMount() {
    if (auth.currentUser)
      this.props.getUserLists(auth.currentUser.uid)
  }

  render() {
    return (
      <Lists
        { ...this.props }
        gotoList={this.gotoList.bind(this)}
        gotoAddList={this.gotoAddList.bind(this)}
        gotoRemoveList={this.gotoRemoveList.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let lists = []
  if (!(state.lists.loadingListIds || state.lists.loadingLists)) {
    lists = Object.keys(state.lists.listIds)
      .map(listId => state.lists.lists[listId])
      .filter(value => value !== null)
  }

  return {
    lists: lists,
    loading: state.lists.loadingListIds || state.lists.loadingLists,
    error: state.lists.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer)
