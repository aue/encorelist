import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as RewardsActions from '../actions/rewards'

import RedeemForm from '../components/RedeemForm'
import RedeemSuccess from '../components/RedeemSuccess'

class RewardRedeemContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      pointCost: 0,
      rewardId: '',
      redeemed: false
    }
  }

  redeem() {
    this.props.redeemReward(this.state.rewardId)
    this.setState({
      redeemed: true
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
    if (!this.state.redeemed)
      return (
        <RedeemForm
          title={this.state.title}
          pointCost={this.state.pointCost}
          accountPoints={this.props.accountPoints}
          error={this.props.error}
          redeem={this.redeem.bind(this)}
        />
      )
    else
      return (
        <RedeemSuccess
          title={this.state.title}
          pointCost={this.state.pointCost}
          accountPoints={this.props.accountPoints}
        />
      )
  }
}

const mapStateToProps = (state) => {
  return {
    rewards: state.rewards.rewards,
    accountPoints: state.account.points,
    error: state.rewards.error,
    adding: state.rewards.adding,
    changing: state.rewards.changing
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RewardsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardRedeemContainer)
