import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
    fontWeight: 'bold'
  },

  whiteColor: {
    color: '#ffffff'
  },

  header: {
    flex: 1,
    alignItems: 'flex-start'
  },

  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsDisplayText: {
    fontSize: 35,
    marginRight: 6
  },
  pointsDisplayBold: {
    fontWeight: '600',
    marginLeft: 2
  }
})
