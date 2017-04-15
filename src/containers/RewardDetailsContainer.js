import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import RewardForm from '../components/RewardForm'
import * as RewardsActions from '../actions/rewards'

class RewardDetailsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      pointCost: 0,
      rewardId: '',
      mode: (this.props.params.rewardId)? 'edit':'add'
    }
  }

  _add(data) {
    this.props.addReward(data).then(() => {
      Actions.pop()
    })
  }

  _update(data) {
    this.props.changeReward(this.state.rewardId, data).then(() => {
      Actions.pop()
    })
  }

  componentWillMount() {
    if (this.props.rewards[this.props.params.rewardId]) {
      let reward = this.props.rewards[this.props.params.rewardId]
      this.setState({
        title: reward.title,
        pointCost: reward.pointCost,
        rewardId: this.props.params.rewardId
      })
    }
  }

  render() {
    return (
      <RewardForm
        title={this.state.title}
        pointCost={this.state.pointCost}
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
    rewards: state.rewards.rewards,
    error: state.rewards.error,
    adding: state.rewards.adding,
    changing: state.rewards.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RewardsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardDetailsContainer)
