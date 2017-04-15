import { Navigator, StyleSheet } from 'react-native'
import common from './common'

export default StyleSheet.create({
  scene: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight
  },
  sceneTabs: {
    paddingTop: 54,
    paddingBottom: 50
  },

  navBar: {
    backgroundColor: common.lightGrey
  },
  navBarTitle: {
    fontWeight: 'bold'
  },
  leftButton: {
    tintColor: common.brandPrimary
  },

  tabs: {
    backgroundColor: common.lightGrey
  },

  container: {
    padding: 8
  },
  section: {
    padding: 8
  },
  message: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc'
  },

  title: {
    fontWeight: 'bold',
    color: common.darkText
  },

  lightColor: {
    color: common.lightText
  },
  mediumColor: {
    color: common.mediumGrey
  },
  text20pt: {
    fontSize: 20
  },

  header: {
    flex: 1,
    alignItems: 'flex-start'
  },

  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointsDisplayText: {
    fontSize: 35,
    marginRight: 6,
    color: common.darkText
  },
  pointsDisplayBold: {
    fontWeight: '600',
    marginLeft: 2,
    color: common.darkText
  },

  rowTitle: {
    fontSize: 20,
    color: common.darkText
  },
  rowSubtitle: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowSubtitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
    marginTop: -2,
    color: common.darkText
  },
  rowSlidein: {
    position: 'absolute',
    padding: 12,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSlideinButton: {
    margin: 4
  },
  rowSlideinButtonText: {
    backgroundColor: common.mediumGrey,
    color: common.white,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30
  },

  pointRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: common.lightBackground
  },
  pointRowCircle: {
    margin: 8,
    padding: 8
  },
  pointRowSection: {
    flex: 1,
    margin: 8,
    padding: 8,
    marginLeft: 0,
    paddingLeft: 0
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemRowCheck: {
    margin: 0,
    padding: 16,
    position: 'absolute',
    left: 0,
    zIndex: 1
  },
  itemRowSection: {
    flex: 1,
    margin: 8,
    padding: 8,
    paddingRight: 16,
    marginLeft: 16 + 40 + 8,
    marginRight: 0
  },

  circle: {
    backgroundColor: common.lightBackground,
    borderWidth: 2,
    borderColor: common.altPrimary,
    borderRadius: 25,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  circleActive: {
    backgroundColor: common.brandPrimary,
    borderColor: common.brandPrimary,
  },
  circleText: {
    color: common.mediumGrey,
    fontSize: 18,
    lineHeight: 29
  },
  circleTextActive: {
    color: common.lightText
  },

  redeemedContainer: {
    flex: 1
  },
  redeemedBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  redeemedTicket: {
    margin: 36,
    borderRadius: 16,
    shadowColor: common.darkBackground,
    shadowRadius: 16
  },
  redeemedSection: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: common.lightBackground
  },
  redeemedTopSection: {
    backgroundColor: common.lightGrey,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  redeemedBottomSection: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  redeemedTagline: {
    fontWeight: 'bold',
    color: common.mediumGrey,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: common.mediumGrey,
    marginBottom: 16
  },
  redeemedCircle: {
    position: 'absolute',
    top: 0
  },
  redeemedTitle: {
    marginBottom: 32,
    fontSize: 35,
    color: common.darkText
  }
})
