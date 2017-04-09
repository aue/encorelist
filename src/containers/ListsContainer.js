import React, { Component } from 'react'
import { Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { auth } from '../firebase'

import Lists from '../components/Lists'
import * as ListsActions from '../actions/lists'

class ListsContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Lists',
    header: ({ navigate }) => {
      let right = (
        <Button
          title="Add"
          onPress={() => navigate('ListDetails')}
        />
      )
      return { right }
    },
  }

  navigateToList(listId, title) {
    const { navigate } = this.props.navigation
    navigate('Items', { listId, title })
  }

  componentWillMount() {
    this.props.getUserLists(auth.currentUser.uid)
  }

  render() {
    return (
      <Lists lists={this.props.lists} navigateToList={this.navigateToList.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listIds: state.lists.listIds,
    lists: state.lists.lists,
    loadingListIds: state.lists.loadingListIds,
    loadingLists: state.lists.loadingLists,
    error: state.lists.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer)
