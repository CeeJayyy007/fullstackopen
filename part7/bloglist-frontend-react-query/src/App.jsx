/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Title from "./components/Title";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "./context/NotificationContext.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserDispatch, useUserValue } from "./context/UserContext.jsx";

const App = () => {
  const queryClient = useQueryClient();

  // notification context
  const dispatchNotification = useNotificationDispatch();
  const { message, error } = useNotificationValue();
  // user context
  const dispatchUser = useUserDispatch();
  const user = useUserValue();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: true,
  });

  // blogs data
  const blogs = result.data && result.data.sort((a, b) => b.likes - a.likes);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(["blogs"]);
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    },
    onError: (exception) => {
      const error = exception.response.data.error;
      errorHandler(error, "error creating blog");
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      );
    },
    onError: (exception) => {
      const error = exception.response.data.error;
      errorHandler(error, "error updating blog");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (exception) => {
      const error = exception.response.data.error;
      errorHandler(error, "error deleting blog");
    },
  });

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      blogService.setToken(user.token);
      dispatchUser({ type: "SET_USER", payload: user });
    }
  }, []);

  // create blog ref for togglable
  const blogFormRef = useRef();

  // do not render anything if notes is still null
  if (!blogs) {
    return null;
  }

  const setNotification = (message, error) => {
    dispatchNotification({
      type: "SHOW",
      payload: { message, error },
    });
    setTimeout(() => {
      dispatchNotification({ type: "HIDE" });
    }, 5000);
  };

  const errorHandler = (error, message) => {
    if (error.includes("token")) {
      window.localStorage.removeItem("loggedInUser");
      dispatchUser({ type: "LOGOUT" });
    }
    setNotification(`${message}: ${error}`, true);
  };

  // create blog handler
  const createBlog = async (newBlogObject) => {
    blogFormRef.current.toggleVisibility();
    await newBlogMutation.mutate(newBlogObject);
  };

  // update blog handler
  const updateLikes = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    await updateBlogMutation.mutate(updatedBlog);
  };

  console.log("blogs", blogs);

  const deleteBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      await deleteBlogMutation.mutate(blogToDelete.id);
    }
  };

  // login handler
  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatchUser({ type: "SET_USER", payload: user });
    } catch (exception) {
      setNotification("Wrong username or password", true);
    }
  };

  // logout handler
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    dispatchUser({ type: "LOGOUT" });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>error loading data</div>;
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <Title title="Log in to application" />
        <LoginForm login={login} />
      </Togglable>
    );
  };

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
              <CreateBlogForm createBlog={createBlog} />
            </Togglable>
          </>
        )}
        <br />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
