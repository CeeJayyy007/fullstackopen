import PropType from "prop-types"

const Notification = ({ message, error = false }) => {
  Notification.propTypes = {
    message: PropType.string,
    error: PropType.bool,
  }

  if (message) {
    if (error) {
      return <div className="error">{message}</div>
    } else {
      return <div className="success">{message}</div>
    }
  }
  return null
}

export default Notification
