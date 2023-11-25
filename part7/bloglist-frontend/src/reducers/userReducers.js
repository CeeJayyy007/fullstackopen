import loginService from "../services/login"
import blogService from "../services/blogs"
import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser, logout } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem("loggedInUser", JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const setUserFromLocalStorage = (loggedInUserJSON) => {
  return async (dispatch) => {
    const user = JSON.parse(loggedInUserJSON)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedInUser")
    dispatch(setUser(initialState))
  }
}

export default userSlice.reducer
