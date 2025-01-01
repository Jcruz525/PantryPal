import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Avatar } from '@mui/material';
import axios from 'axios';

const icons = {
  CheckCircle: '/path/to/check-circle-icon.png',
  Face: 'FaceStar.svg',
  EmojiNature: '/path/to/emoji-nature-icon.png',
  Person: '/path/to/person-icon.png',
  Favorite: '/path/to/favorite-icon.png',
  Star: '/path/to/star-icon.png',
};

const UserProfile = () => {
  const [nickname, setNickname] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(icons.Face);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          setEmail(userData.email);
          setNickname(userData.nickname || '');
          setSelectedIcon(userData.profileImg || icons.Face);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          setLoading(false);
        });
    }
  }, [token]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSaveProfile = () => {
    const updatedProfile = { nickname, profileImg: selectedIcon };

    axios
      .put('http://localhost:5000/api/auth/profile', updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
      });
  };

  const handleSelectIcon = (icon) => {
    setSelectedIcon(icon);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <h2>Edit Profile</h2>
      <Avatar sx={{ width: 100, height: 100, marginBottom: '16px' }}>
        <img src={selectedIcon} alt="Avatar" style={{ width: '100%', height: '100%' }} />
      </Avatar>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        fullWidth
        sx={{ marginBottom: '16px' }}
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
        sx={{ marginBottom: '16px' }}
      />
      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '16px' }}>
        {Object.keys(icons).map((iconName, index) => {
          const iconSrc = icons[iconName];
          return (
            <Grid item key={index} xs={2}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '8px',
                  border: selectedIcon === iconSrc ? '2px solid #1976D2' : '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: "#1976D2",
                }}
                onClick={() => handleSelectIcon(iconSrc)}
              >
                <img src={iconSrc} alt={iconName} style={{ width: '40px', height: '40px' }} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSaveProfile}>
        Save Profile
      </Button>
      <Box sx={{ marginTop: '20px' }}>
        <h3>Updated Profile:</h3>
        <p>Email: {user?.email}</p>
        <p>Nickname: {user?.nickname}</p>
        <Avatar sx={{ width: 50, height: 50, marginBottom: '16px' }}>
          <img src={user?.profileImg} alt="Updated Avatar" style={{ width: '100%', height: '100%' }} />
        </Avatar>
      </Box>
    </Box>
  );
};

export default UserProfile;
