/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Blogs from "./components/Blogs";
import { useNotificationValue } from "./context/NotificationContext.jsx";
import blogService from "./services/blogs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserDispatch, useUserValue } from "./context/UserContext.jsx";
import Users from "./components/Users";
import BlogHeader from "./components/BlogHeader.jsx";
import "./index.css";
import User from "./components/User.jsx";
import BlogView from "./components/BlogView.jsx";
import NavBar from "./components/NavBar.jsx";
import ToggleableLoginForm from "./components/TogglableLoginForm.jsx";
import useAuthentication from "./hook/useAuthentication.js";
import useBlogFunctions from "./hook/useBlogFunctions.js";
import useNotification from "./hook/useNotification.js";

const App = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // user context
  const dispatchUser = useUserDispatch();
  const user = useUserValue();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: true,
  });

  // useNotification
  const { setNotification, errorHandler } = useNotification();

  // notification context
  const { message, error } = useNotificationValue();

  // useAuthentication
  const { login, handleLogout } = useAuthentication(
    dispatchUser,
    setNotification,
    navigate
  );

  // blog functions
  const { createBlog, updateLikes, addComment, deleteBlog } = useBlogFunctions(
    setNotification,
    errorHandler,
    navigate
  );

  // blogs data
  const blogs = result.data && result.data.sort((a, b) => b.likes - a.likes);

  // do not render anything if notes is still null
  if (!blogs) {
    return null;
  }

  console.log("blogs", blogs);

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
              createBlog={createBlog}
            />
          }
        />

        <Route
          path="/users"
          element={
            user ? <Users blogs={blogs} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/users/:id"
          element={
            user ? <User blogs={blogs} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <BlogView
                blogs={blogs}
                updateLikes={updateLikes}
                deleteBlog={deleteBlog}
                addComment={addComment}
                user={user}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/login" element={<ToggleableLoginForm login={login} />} />
      </Routes>
    </div>
  );
};

export default App;
