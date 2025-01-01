import React from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 700 }}>
        About Us
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="About1.jpg"
              alt="Cooking"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                What is PantryPal?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                At PantryPal, we believe cooking should be easy, fun, and personalized to your preferences. Our app helps you find delicious recipes based on the ingredients you already have in your pantry.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="About2.jpg"
              alt="Mission"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Our mission is to minimize food waste and inspire creativity in the kitchen. With PantryPal, you’ll never have to wonder what to cook again—just open the app and let us do the rest.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="About3.jpg"
              alt="Get Started"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Get Started
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Ready to make cooking easier and more fun? Join us today and start discovering new recipes with the ingredients you already have!
              </Typography>
              <Button variant="contained" color="primary" href="/inventory" sx={{ mt: 2 }}>
                Add to Pantry
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} PANTRYPAL. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
