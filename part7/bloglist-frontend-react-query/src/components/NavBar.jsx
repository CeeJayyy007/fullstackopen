import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  background-color: #000; /* Dark background color */
  padding: 10px 0px 10px 20px;
  margin-bottom: 5px;
  border-radius: 4px;
  display: inline-block;
  width: 100%;
`;

const StyledLink = styled(Link)`
  padding-right: 20px;
  color: #fff; /* White color for links */
  text-decoration: none;
  font-size: 16px; /* Adjust font size as needed */

  &:hover {
    color: #ddd; /* Lighter color on hover */
  }
`;

const LogoutButton = styled.button`
  margin-left: 20px;
  background-color: #fff; /* White background color for button */
  color: #000; /* Dark text color */
  font-size: 16px; /* Adjust font size as needed */
  padding: 8px 12px;
  border: 1px solid #000; /* Dark border */
  border-radius: 4px;

  &:hover {
    background-color: #ddd; /* Lighter background color on hover */
  }
`;

const NavBar = ({ user, handleLogout }) => {
  return (
    <NavContainer>
      <StyledLink to="/">blogs</StyledLink>
      <StyledLink to="/users">users</StyledLink>
      {user ? (
        <>
          <StyledLink>
            <strong>{user.name} </strong>logged in
          </StyledLink>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      ) : (
        <StyledLink to="/login">login</StyledLink>
      )}
    </NavContainer>
  );
};

export default NavBar;
