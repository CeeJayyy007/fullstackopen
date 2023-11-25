import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from "./reducers/notificationReducers"
import blogsReducer from "./reducers/blogsReducers"
import userReducer from "./reducers/userReducers"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

export default store
