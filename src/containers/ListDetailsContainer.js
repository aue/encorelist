import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import ListForm from '../components/ListForm'
import * as ListsActions from '../actions/lists'

class ListDetailsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      listId: '',
      mode: (this.props.params.listId)? 'edit':'add'
    }
  }

  _add(data) {
    this.props.addList(data).then(() => {
      Actions.pop()
    })
  }

  _update(data) {
    this.props.changeList(this.state.listId, data).then(() => {
      Actions.pop()
    })
  }

  componentWillMount() {
    if (this.props.lists[this.props.params.listId]) {
      let list = this.props.lists[this.props.params.listId]
      this.setState({
        title: list.title,
        listId: this.props.params.listId
      })
    }
  }

  render() {
    return (
      <ListForm
        title={this.state.title}
        mode={this.state.mode}
        error={this.props.error}
        adding={this.props.adding}
        changing={this.props.changing}
        _add={this._add.bind(this)}
        _update={this._update.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists.lists,
    error: state.lists.error,
    adding: state.lists.adding,
    changing: state.lists.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetailsContainer)
