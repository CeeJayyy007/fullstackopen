import { hideNotification } from "../reducers/notificationReducer";

export const removeNotification = (dispatch) => {
  setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);
};
