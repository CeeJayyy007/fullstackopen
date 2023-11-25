import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  error: false,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return initialState
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, error = false) => {
  return async (dispatch) => {
    dispatch(showNotification({ message, error }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
