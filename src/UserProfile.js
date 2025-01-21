import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ICONS = {
  Soda: "sodaAvatar.png",
  Fries: "fryAvatar.png",
  Noodles: "noodleAvatar.png",
  Pizza: "pizzaAvatar.png",
  Rice: "riceAvatar.png",
  Cupcake: "cupcakeAvatar.png",
  Bread: "breadAvatar.png",
  Broccoli: "broccoliAvatar.png",
  Coffee: "coffeeAvatar.png",
  Croissant: "crossAvatar.png",
  Taco: "tacoAvatar.png",
  Steak: "steakAvatar.png",
};

const UserProfile = () => {
  const [nickname, setNickname] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICONS.Face);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          setEmail(userData.email);
          setNickname(userData.nickname || "");
          setSelectedIcon(userData.profileImg || ICONS.Face);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
    }
  }, [token]);

  const handleNicknameChange = (e) => setNickname(e.target.value);

  const handleSaveProfile = () => {
    const updatedProfile = { nickname, profileImg: selectedIcon };

    axios
      .put("http://localhost:5000/api/auth/profile", updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Profile updated successfully!");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      });
  };

  const handleSelectIcon = (icon) => setSelectedIcon(icon);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: "16px" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Edit Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1976D2",
          borderRadius: "50px",
          padding: "8px 20px",
          marginBottom: "16px",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            marginRight: "16px",
            backgroundColor: "transparent",
            imageRendering: "crisp-edges",
          }}
        >
          <img
            src={selectedIcon}
            alt="Avatar"
            style={{ width: "100%", height: "100%" }}
          />
        </Avatar>
        <Typography variant="h6" color="white" sx={{ fontWeight: 500 }}>
          {nickname || "Enter your nickname"}
        </Typography>
      </Box>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        fullWidth
        sx={{ marginBottom: "16px" }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Nickname"
        variant="outlined"
        value={nickname}
        onChange={handleNicknameChange}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        Select Profile Icon
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: "16px" }}
      >
        {Object.keys(ICONS).map((iconName, index) => {
          const iconSrc = ICONS[iconName];
          return (
            <Grid item key={index} xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "8px",
                  border:
                    selectedIcon === iconSrc
                      ? "2px solid #fff"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedIcon === iconSrc ? "#fff" : "transparent",
                  transition: "background-color 0.3s, border-color 0.3s",
                }}
                onClick={() => handleSelectIcon(iconSrc)}
              >
                <img
                  src={iconSrc}
                  alt={iconName}
                  style={{ width: "40px", height: "40px" }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        fullWidth
      >
        Save Profile
      </Button>
    </Box>
  );
};

export default UserProfile;
