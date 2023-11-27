import { Outlet } from "react-router-dom";
import Title from "./Title";
import Notification from "./Notification";
import ToggleableLoginForm from "./TogglableLoginForm";

const BlogHeader = ({ user, message, error, handleLogout, login }) => {
  return (
    <div>
      <Title title="Blogs" />
      {message && <Notification message={message} error={error} />}
      {!user && <ToggleableLoginForm login={login} />}

      <Outlet />
    </div>
  );
};

export default BlogHeader;
