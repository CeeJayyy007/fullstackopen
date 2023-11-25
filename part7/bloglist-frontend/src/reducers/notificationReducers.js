const initialState = {
  message: "",
  error: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SHOW":
    return { ...action.payload }
  case "HIDE":
    return ""
  default:
    return state
  }
}

export const toggleNotification = (type, notification) => {
  return {
    type: type,
    payload: notification,
  }
}

export default notificationReducer
