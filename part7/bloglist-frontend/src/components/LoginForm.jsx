import { useState } from "react";
import PropType from "prop-types";

// login form
const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    login({
      username,
      password,
    });

    setUsername("");
    setPassword("");
  };

  LoginForm.propTypes = {
    login: PropType.func.isRequired,
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
