import React, { Component } from 'react'
import { Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ListsListing from '../components/ListsListing'
import * as ListsActions from '../actions/lists'

class ListsContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Lists',
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

  navigateToList(listId) {
    const { navigate } = this.props.navigation
    navigate('Items', { listId })
  }

  componentWillMount() {
    this.props.getUserLists(1)
  }

  componentWillReceiveProps(nextProps) {
    /*if (this.props.lists !== nextProps.lists) {
      this.dataSource = this.dataSource.cloneWithRows(nextProps.lists)
    }*/
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ListsListing lists={this.props.lists} navigateToList={this.navigateToList.bind(this)} />
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
