const topics = (state = {message: 'Fuck redux'}, action) => {
  switch (action.type) {
    case 'CHANGE_TOPIC':
      return {
        ...state,
        ...action.topic
      }
    case 'CLEAR_TOPIC':
      return state
    default:
      return {}
  }
}

export default topics