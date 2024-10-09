import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLoginLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLoginLogout }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      alert("Please login first");
    }
  };

  const handleBookSlotClick = () => {
    if (isLoggedIn) {
      navigate("/slotbooking");
    } else {
      alert("Please login first");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>

          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            SLOT BOOKING
          </Typography>
        </div>
        <div>
          {!isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Button color="inherit" onClick={handleDashboardClick}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleBookSlotClick}>
                Book a Slot
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  onLoginLogout(); // Calls the logout function
                  navigate("/login"); // Redirect to login after logout
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


