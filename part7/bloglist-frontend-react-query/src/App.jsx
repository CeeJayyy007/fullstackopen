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

const App = () => {
  const [user, setUser] = useState(null);

  const queryClient = useQueryClient();

  const dispatchNotification = useNotificationDispatch();
  const { message, error } = useNotificationValue();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  // blogs data
  const blogs = result.data;

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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
      setUser(null);
    }

    setNotification(`${message}: ${error}`, true);
  };

  // create blog handler
  const createBlog = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      newBlogMutation.mutate(newBlogObject);
      setNotification(
        `a new blog ${newBlogObject.title} by ${newBlogObject.author} added`
      );
    } catch (exception) {
      const error = exception.response.data.error;
      errorHandler(error, "error creating blog");
    }
  };

  // update blog handler
  const updateLikes = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id);

    try {
      const updatedBlog = await blogService.update(id, {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      });

      // setBlogs(
      //   blogs
      //     .map((blog) => (blog.id === id ? updatedBlog : blog))
      //     .sort((a, b) => b.likes - a.likes)
      // );
    } catch (exception) {
      const error = exception.response.data.error;
      errorHandler(error, "error updating blog");
    }
  };

  console.log("blogs", blogs);

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);

    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.remove(id);
        // setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (exception) {
        const error = exception.response.data.error;
        errorHandler(error, "error deleting blog");
      }
    }
  };

  // login handler
  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setNotification("Wrong username or password", true);
    }
  };

  // logout handler
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
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
