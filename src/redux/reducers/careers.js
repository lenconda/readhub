const careers = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_CAREER':
      return {
        ...state,
        ...action.career
      }
    default:
      return {}
  }
}

export default careers