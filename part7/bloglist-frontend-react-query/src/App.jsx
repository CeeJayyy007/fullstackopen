/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useMatch,
} from "react-router-dom";
import Blogs from "./components/Blogs";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "./context/NotificationContext.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserDispatch, useUserValue } from "./context/UserContext.jsx";
import Users from "./components/Users";
import BlogHeader from "./components/BlogHeader.jsx";
import "./index.css";
import User from "./components/User.jsx";
import BlogView from "./components/BlogView.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      navigate("/");
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
      await dispatchUser({ type: "SET_USER", payload: user });
      navigate("/");
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

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout} />
      <BlogHeader
        user={user}
        message={message}
        error={error}
        handleLogout={handleLogout}
        login={login}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              blogs={blogs}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              user={user}
              blogFormRef={blogFormRef}
              createBlog={createBlog}
            />
          }
        />

        <Route
          path="/users"
          element={user ? <Users blogs={blogs} /> : <Navigate replace to="/" />}
        />
        <Route
          path="/users/:id"
          element={user ? <User blogs={blogs} /> : <Navigate replace to="/" />}
        />
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <BlogView
                blogs={blogs}
                updateLikes={updateLikes}
                deleteBlog={deleteBlog}
              />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
