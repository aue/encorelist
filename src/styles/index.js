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
  }
})
