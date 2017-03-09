import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../components/List'
import * as ItemsActions from '../actions/items'

const mapStateToProps = (state) => {
  return {
    onlineItems: state.items.onlineList,
    offlineItems: state.items.offlineList,
    connectionChecked: state.items.connectionChecked,
    connected: state.items.connected,
    itemIds: state.items.itemIds,
    items: state.items.items,
    loadingItemIds: state.items.loadingItemIds,
    loadingItems: state.items.loadingItems,
    error: state.items.error,
    changingItem: state.items.changingItem,
    addingItem: state.items.addingItem,
    removingItem: state.items.removingItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ItemsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
