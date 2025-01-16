import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Inventory from "./Inventory";
import RecipeSuggestions from "./RecipeSuggestions";
import RecipeDetail from "./RecipeDetail";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "./UserProfile";

function App() {
  const [inventory, setInventory] = useState([]);
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setNickname(userData.nickname || "");
      setProfileImg(userData.profileImg || "");
    }

    if (location.pathname === "/") {
      document.body.style.background =
        "linear-gradient(to bottom, #FFFEFE 0%,#8CBAE8 45%, #1976D2 88%)";
    } else {
      document.body.style.background = "white";
    }

    return () => {
      document.body.style.background = "white";
    };
  }, [location]);

  const handleAddToInventory = (ingredient) => {
    setInventory((prevInventory) => [...prevInventory, ingredient]);
  };

  const handleRemoveFromInventory = (ingredient) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item !== ingredient)
    );
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <img
            src="/PantryPalLogo.svg"
            alt="Pantry Pal Logo"
            style={{
              marginRight: "8px",
              marginLeft: "20px",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/")}
          />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            PantryPal
          </Typography>
          <Button color="inherit" component={Link} to="/home" sx={{ mr: 2 }}>
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/inventory"
            sx={{ mr: 2 }}
          >
            Pantry
          </Button>
          <Button color="inherit" component={Link} to="/recipes" sx={{ mr: 2 }}>
            Recipes
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={{ mr: 10 }}>
            About
          </Button>

          {localStorage.getItem("user") ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Avatar
                src={profileImg}
                alt={nickname}
                sx={{
                  marginRight: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={handleMenuOpen}
              />
              <Typography variant="body1">{nickname}</Typography>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    window.location.href = "/user-profile";
                  }}
                >
                  User Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    alert("Settings coming soon!");
                  }}
                >
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{ mr: 2 }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 0 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes"
            element={<RecipeSuggestions inventory={inventory} />}
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory
                  inventory={inventory}
                  onAdd={handleAddToInventory}
                  onRemove={handleRemoveFromInventory}
                />
              </PrivateRoute>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
