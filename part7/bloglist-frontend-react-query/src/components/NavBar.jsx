import { Link } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 20,
  };

  const margin = {
    marginLeft: 20,
  };

  const navStyle = {
    backgroundColor: "lightgray",
    padding: "10px 0px 10px 20px",
    marginBottom: 5,
    borderRadius: 4,
    display: "inline-block",
    width: "100%",
  };

  return (
    <div style={navStyle}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          <strong>{user.name} </strong>logged in
          <button style={margin} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default NavBar;
