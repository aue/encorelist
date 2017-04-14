import React, { Component } from 'react'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { auth } from '../firebase'

import * as RewardsActions from '../actions/rewards'

import PointListView from '../components/PointListView'

class RewardsContainer extends Component {
  constructor(props) {
    super(props)
  }

  gotoAddReward() {
    Actions.rewardDetails({ params: {}, title: 'Add Reward' })
  }

  gotoRemoveReward(rewardId) {
    Alert.alert(
      'Delete this reward?',
      'This will be removed',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeReward(rewardId), style: 'destructive'},
      ]
    )
  }

  componentWillMount() {
    if (auth.currentUser)
      this.props.getUserRewards(auth.currentUser.uid)
  }

  render() {
    return (
      <PointListView
        data={this.props.rewards}
        accountPoints={this.props.accountPoints}
        object="reward"
        loading={this.props.loading}
        onRowPress={() => null}
        onRowLongPress={this.gotoRemoveReward.bind(this)}
        onAddPress={this.gotoAddReward.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let rewards = Object.values(state.rewards.rewards)
  if (rewards.length > 0) {
    rewards = rewards.map(reward => {
      let percentage = state.account.points/reward.pointCost
      if (percentage > 1) percentage = 1

      return {
        id: reward.id,
        title: reward.title,
        subtitle: `${reward.pointCost} Points`,
        value: reward.pointCost,
        percentage: percentage
      }
    })
  }

  return {
    rewards: rewards,
    accountPoints: state.account.points,
    init: state.rewards.init,
    loading: state.rewards.loadingRewardIds || state.rewards.loadingRewards,
    error: state.rewards.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RewardsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsContainer)
