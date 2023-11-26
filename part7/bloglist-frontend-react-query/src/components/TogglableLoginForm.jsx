import Togglable from "./Togglable";
import Title from "./Title";
import LoginForm from "./LoginForm";

const ToggleableLoginForm = ({ login }) => {
  return (
    <Togglable buttonLabel="Login">
      <Title title="Log in to application" />
      <LoginForm login={login} />
    </Togglable>
  );
};

export default ToggleableLoginForm;
