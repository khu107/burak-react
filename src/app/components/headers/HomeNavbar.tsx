import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HomeNavbar() {
  const authMember = null;
  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu ">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" alt="burak" src="/icons/burak.svg" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            {/* BASKET */}

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "50px", height: "50xp", borderRadius: "24px" }}
                alt="default-user"
                src="/icons/default-user.svg"
                aria-haspopup="true"
              />
            )}
          </Stack>
        </Stack>
        <Stack>DETAIL</Stack>
      </Container>
    </div>
  );
}