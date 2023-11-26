/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs.js"
import loginService from "./services/login.js"
import Title from "./components/Title"
import LoginForm from "./components/LoginForm"
import CreateBlogForm from "./components/CreateBlogForm"
import Notification from "./components/Notification"
import "./index.css"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducers"
import {
  initializeBlogs,
  updateLikes,
  deleteBlog,
  createBlog,
} from "./reducers/blogsReducers.js"
import {
  loginUser,
  logoutUser,
  setUserFromLocalStorage,
} from "./reducers/userReducers.js"

const App = () => {
  const dispatch = useDispatch()
  const { message, error } = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser")

    if (loggedInUserJSON) {
      dispatch(setUserFromLocalStorage(loggedInUserJSON))
    }
  }, [])

  // create blog ref for togglable
  const blogFormRef = useRef()

  // do not render anything if notes is still null
  if (!blogs) {
    return null
  }

  // error handler
  const errorHandler = (message, error) => {
    if (error.includes("token")) {
      dispatch(logoutUser())
    }
    dispatch(setNotification(message, true))
  }

  // create blog handler
  const createNewBlog = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(createBlog(newBlogObject))
      dispatch(
        setNotification(
          `a new blog ${newBlogObject.title} by ${newBlogObject.author} added`,
          false
        )
      )
    } catch (exception) {
      const error = exception.response.data.error
      errorHandler("error creating blog", error)
    }
  }

  // update blog handler
  const updateBlogLikes = async (blogToUpdate) => {
    try {
      await dispatch(updateLikes(blogToUpdate, blogToUpdate.id))
    } catch (exception) {
      const error = exception.response.data.error
      errorHandler("error updating blog: unauthorized user action", error)
    }
  }

  console.log("blogs", blogs)

  const deleteBlogRecord = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        await dispatch(deleteBlog(blogToDelete.id))
      } catch (exception) {
        const error = exception.response.data.error
        errorHandler("error deleting blog", error)
      }
    }
  }

  // login handler
  const login = async (credentials) => {
    try {
      await dispatch(loginUser(credentials))
    } catch (exception) {
      const error = exception.response.data.error
      errorHandler("Wrong username or password", error)
    }
  }

  // logout handler
  const handleLogout = async () => {
    await dispatch(logoutUser())
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <Title title="Log in to application" />
        <LoginForm login={login} />
      </Togglable>
    )
  }

  return (
    <div>
      <div>
        <Title title="Blogs" />
        {message && <Notification message={message} error={error} />}
        {!user && loginForm()}
        {user && (
          <>
            <p>
              <strong>{user && user.name}</strong> logged in{" "}
              <button onClick={handleLogout}>Logout</button>
            </p>

            <Togglable buttonLabel="Create new list" ref={blogFormRef}>
              <CreateBlogForm createBlog={createNewBlog} />
            </Togglable>
          </>
        )}
        <br />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={() => updateBlogLikes(blog)}
            deleteBlog={() => deleteBlogRecord(blog)}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
