import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import Title from "./components/Title";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, [blog]);

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

  // login handler
  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setError(true);
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const errorHandler = (error, message) => {
    setError(true);
    if (error.includes("token")) {
      window.localStorage.removeItem("loggedInUser");
      setUser(null);
    }
    setErrorMessage(`${message}: ${error}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  // create blog handler
  const createBlog = async (newBlogObject) => {
    try {
      const blog = await blogService.create(newBlogObject);
      blogFormRef.current.toggleVisibility();

      setBlog(blog);
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
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

      setBlogs(
        blogs
          .map((blog) => (blog.id === id ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes)
      );
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
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (exception) {
        const error = exception.response.data.error;
        errorHandler(error, "error deleting blog");
      }
    }
  };

  // logout handler
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

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
        {successMessage && <Notification message={successMessage} />}
        {errorMessage && <Notification message={errorMessage} error={error} />}
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
