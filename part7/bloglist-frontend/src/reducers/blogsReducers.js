import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = []

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    updateLikesOf(state, action) {
      const updatedBlog = action.payload
      const id = action.payload.id

      return state
        .map((blog) => (blog.id === id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    },
    deleteFrom(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, updateLikesOf, deleteFrom } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateLikes = (blogToUpdate, id) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    })

    dispatch(updateLikesOf(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch(deleteFrom(id))
  }
}

export default blogSlice.reducer
