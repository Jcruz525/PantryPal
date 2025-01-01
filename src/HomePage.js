import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';


const featuredRecipes = [
  { id: 1, title: 'Spaghetti Carbonara', image: '/images/carbonara.jpg' },
  { id: 2, title: 'Chicken Stir-Fry', image: '/images/stirfry.jpg' },
  { id: 3, title: 'Vegetable Soup', image: '/images/soup.jpg' }
];

const recentRecipes = [
  { id: 4, title: 'Beef Tacos', image: '/images/tacos.jpg' },
  { id: 5, title: 'Grilled Salmon', image: '/images/salmon.jpg' }
];

const favoriteRecipes = [
  { id: 6, title: 'Olive Oil Cake', image: '/images/cake.jpg' },
  { id: 7, title: 'Garlic Olive Oil Pasta', image: '/images/pasta.jpg' }
];

const HomePage = () => {
  const [favorites, setFavorites] = useState(favoriteRecipes);
  const [recent, setRecent] = useState(recentRecipes);
  const [featured, setFeatured] = useState(featuredRecipes);

  useEffect(() => {
    
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Featured Recipes
      </Typography>
      <Grid container spacing={4}>
        {featured.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card>
              <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Button variant="outlined" fullWidth component={Link} to={`/recipe/${recipe.id}`} sx={{ mt: 2 }}>
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <Typography variant="h4" sx={{ mt: 6, mb: 4, fontWeight: 700 }}>
        Recently Viewed Recipes
      </Typography>
      <Grid container spacing={4}>
        {recent.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card>
              <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Button variant="outlined" fullWidth component={Link} to={`/recipe/${recipe.id}`} sx={{ mt: 2 }}>
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <Typography variant="h4" sx={{ mt: 6, mb: 4, fontWeight: 700 }}>
        Favorite Recipes with Olive Oil
      </Typography>
      <Grid container spacing={4}>
        {favorites.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card>
              <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Button variant="outlined" fullWidth component={Link} to={`/recipe/${recipe.id}`} sx={{ mt: 2 }}>
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Latest Blog Posts
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">How to Save Time in the Kitchen</Typography>
                <Typography variant="body2" color="text.secondary">
                  Learn how to streamline your cooking process with these helpful tips and tricks!
                </Typography>
                <Button variant="outlined" component={Link} to="/blog/1" sx={{ mt: 2 }}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">5 Easy One-Pot Recipes</Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover quick and easy recipes that require only one pot to make cleanup a breeze!
                </Typography>
                <Button variant="outlined" component={Link} to="/blog/2" sx={{ mt: 2 }}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
