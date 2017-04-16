import React, { Component } from 'react'
import { Alert, InteractionManager } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { auth } from '../firebase'

import * as RewardsActions from '../actions/rewards'

import PointListView from '../components/PointListView'

class RewardsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderPlaceholderOnly: true
    }
  }

  gotoReward(rewardId, title) {
    Actions.rewardRedeem({
      params: { rewardId, title },
      title: 'Redeem',
      backTitle: 'Rewards'
    })
  }

  gotoEditReward(rewardId) {
    Actions.rewardDetails({
      params: { rewardId },
      title: 'Edit Reward',
      direction: 'vertical',
      backTitle: 'Cancel',
      hideBackImage: true
    })
  }

  gotoDeleteReward(rewardId) {
    Alert.alert(
      'Delete this reward',
      'This reward will be deleted.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.removeReward(rewardId), style: 'destructive'},
      ]
    )
  }

  gotoAddReward() {
    Actions.rewardDetails({
      params: { },
      title: 'Add Reward',
      direction: 'vertical',
      backTitle: 'Cancel',
      hideBackImage: true
    })
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false})

      if (auth.currentUser && !this.props.init)
        this.props.getUserRewards(auth.currentUser.uid)
    })
  }

  render() {
    return (
      <PointListView
        data={this.props.rewards}
        accountPoints={this.props.accountPoints}
        object="reward"
        loading={this.state.renderPlaceholderOnly || this.props.loading}
        onRowPress={this.gotoReward.bind(this)}
        onEditPress={this.gotoEditReward.bind(this)}
        onDeletePress={this.gotoDeleteReward.bind(this)}
        onAddPress={this.gotoAddReward.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let rewards = Object.values(state.rewards.rewards)
  if (rewards.length > 0) {
    rewards = rewards.map(reward => {
      return {
        key: reward.id,
        id: reward.id,
        title: reward.title,
        subtitle: `${reward.pointCost} Points`,
        value: reward.pointCost
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
