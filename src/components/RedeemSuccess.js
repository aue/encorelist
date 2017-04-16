import React, { Component } from 'react'
import { Animated, InteractionManager, ScrollView, StatusBar, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from '../styles'
import common from '../styles/common'

import Diamond from './Diamond'
import PointCircle from './PointCircle'

export default class RedeemSuccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.75)
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(this.state.opacity, { toValue: 1, duration: 500 }).start()
      Animated.timing(this.state.scale, { toValue: 1, duration: 750 }).start()
    })
  }

  render() {
    return (
      <Animated.View style={[styles.redeemedContainer, { opacity: this.state.opacity }]}>
        <StatusBar
         backgroundColor={common.brandPrimary}
         barStyle="light-content"
        />
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={[common.brandSecondary, common.brandPrimary]} style={styles.redeemedBackground} />
        <ScrollView>
          <Animated.View style={[styles.redeemedTicket, { transform: [{ scale: this.state.scale }] }]}>
            <View style={[styles.redeemedSection, styles.redeemedTopSection]}>
              <View style={styles.redeemedTagline}>
                <Text style={styles.redeemedTaglineText}>REDEEM ONE</Text>
              </View>
              <PointCircle value={this.props.pointCost} style={styles.redeemedCircle} />
            </View>
            <View style={[styles.redeemedSection, styles.redeemedBottomSection]}>
              <Text style={styles.redeemedTitle}>{this.props.title}</Text>
              <Text style={[styles.title, styles.mediumColor]}>Congrats! You now have</Text>
              <View style={styles.pointsDisplay}>
                <Text style={[styles.pointsDisplayText, styles.mediumColor, styles.text20pt]}>{this.props.accountPoints}</Text>
                <Diamond size={16} color={common.mediumGrey} />
                <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold, styles.mediumColor, styles.text20pt]}>pts</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    )
  }
}
