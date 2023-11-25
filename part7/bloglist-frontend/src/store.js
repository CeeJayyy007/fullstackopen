import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from "./reducers/notificationReducers"
import blogsReducer from "./reducers/blogsReducers"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})

export default store
