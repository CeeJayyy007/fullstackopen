const Notification = ({ message, error = false }) => {
  if (message) {
    if (error) {
      return <div className="error">{message}</div>;
    } else {
      return <div className="success">{message}</div>;
    }
  }
  return null;
};

export default Notification;
