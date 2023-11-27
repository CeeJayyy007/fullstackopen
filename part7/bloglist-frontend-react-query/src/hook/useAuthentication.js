/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

const useAuthentication = (dispatchUser, setNotification, navigate) => {
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      blogService.setToken(user.token);
      dispatchUser({ type: "SET_USER", payload: user });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatchUser({ type: "SET_USER", payload: user });
      navigate("/");
    } catch (exception) {
      setNotification("Wrong username or password", true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    dispatchUser({ type: "LOGOUT" });
  };

  return { login, handleLogout };
};

export default useAuthentication;
