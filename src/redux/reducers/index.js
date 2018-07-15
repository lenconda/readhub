// export default (state, action) => {
//   switch (action.type) {
//     case 'CHANGE_TOPIC':
//       return state.concat(action.topic)
//     case 'CLEAR_TOPIC':
//       return {}
//     default:
//       return state
//   }
// }

import { combineReducers } from 'redux'
import topics from './topics'

export default combineReducers({
  topics: topics
})