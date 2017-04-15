import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import styles from '../styles'
import common from '../styles/common'

import Diamond from './Diamond'
import PointCircle from './PointCircle'
import PillButton from './PillButton'

export default class RedeemForm extends Component {
  constructor(props) {
    super(props)
  }

  onPress = () => {
    this.props.redeem()
  }

  render() {
    let content
    if (this.props.accountPoints < this.props.pointCost)
      content = (
        <View style={styles.section}>
          <Text style={styles.title}>To redeem, you still need</Text>
          <View style={styles.pointsDisplay}>
            <Text style={styles.pointsDisplayText}>{this.props.pointCost - this.props.accountPoints}</Text>
            <Diamond size={27} />
            <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold]}>pts</Text>
          </View>
        </View>
      )
    else
      content = (
        <View style={styles.section}>
          <Text style={styles.title}>After redeeming, you will have</Text>
          <View style={styles.pointsDisplay}>
            <Text style={styles.pointsDisplayText}>{this.props.accountPoints - this.props.pointCost}</Text>
            <Diamond size={27} />
            <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold]}>pts</Text>
          </View>
        </View>
      )

    return (
      <ScrollView>
        <View style={styles.pointRow}>
          <View style={styles.pointRowCircle}>
            <PointCircle value={this.props.pointCost} />
          </View>
          <View style={styles.pointRowSection}>
            <Text style={styles.rowTitle}>{this.props.title}</Text>
            <View style={styles.rowSubtitle}>
              <Text style={styles.rowSubtitleText}>{this.props.pointCost}</Text>
              <Diamond color={common.darkText} size={13} />
              <Text style={styles.rowSubtitleText}>pts</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.title}>You currently have</Text>
            <View style={styles.pointsDisplay}>
              <Text style={styles.pointsDisplayText}>{this.props.accountPoints}</Text>
              <Diamond size={27} />
              <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold]}>pts</Text>
            </View>
          </View>

          {content}

          <View style={styles.section}>
            <PillButton
              onPress={this.onPress}
              title="Redeem"
              disabled={this.props.accountPoints < this.props.pointCost}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
