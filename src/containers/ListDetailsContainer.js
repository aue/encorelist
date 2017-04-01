import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ListForm from '../components/ListForm'
import * as ListsActions from '../actions/lists'

class ListDetailsContainer extends Component {
  constructor(props) {
    super(props)
    const { state } = this.props.navigation
    this.state = {
      data: state.params || {},
      mode: 'add'
    }
  }

  static navigationOptions = {
    title: ({ state }) => {
      return 'Add List'
    },
  }

  _add(data) {
    const { goBack } = this.props.navigation
    this.props.addList(data).then(() => {
      goBack()
    })
  }

  _update(data) {
    const { goBack } = this.props.navigation
    this.props.changeList(this.state.data.listId, data).then(() => {
      goBack()
    })
  }

  componentWillMount() {
    if (this.state.data.listId) this.setState({mode: 'edit'})
  }

  render() {
    return (
      <ListForm
        { ...this.state.data }
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
    error: state.lists.error,
    adding: state.lists.adding,
    changing: state.lists.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetailsContainer)
