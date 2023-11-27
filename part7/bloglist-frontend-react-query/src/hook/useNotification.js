import { useUserDispatch } from "../context/UserContext";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "../context/NotificationContext";

const useNotification = () => {
  // notification context
  const dispatchNotification = useNotificationDispatch();

  // user context
  const dispatchUser = useUserDispatch();

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

  return { setNotification, errorHandler };
};

export default useNotification;
