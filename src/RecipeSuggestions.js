import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

function RecipeSuggestions({ inventory }) {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!ingredients.trim()) return;
  
    setLoading(true);
    try {

      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=20&apiKey=${SPOONACULAR_API_KEY}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };
  


  const getMissingAmount = (ingredient) => {
    const inventoryItem = inventory.find(
      (item) => item.name.toLowerCase() === ingredient.name.toLowerCase()
    );

    if (inventoryItem) {
      const inventoryAmount = inventoryItem.amount || 0;
      const neededAmount = ingredient.amount - inventoryAmount;
      return neededAmount > 0 ? neededAmount : 0;
    }
    return ingredient.amount;
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Find Recipes Based on Ingredients
      </Typography>
      <TextField
        label="Enter Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        onClick={fetchRecipes}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 4 }}
      >
        Find Recipes
      </Button>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ingredients: {recipe.usedIngredientCount} used /{" "}
                    {recipe.missedIngredientCount} missing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Missing Ingredients:
                    <ul>
                      {recipe.missedIngredients.map((ingredient) => {
                        const missingAmount = getMissingAmount(ingredient);
                        return (
                          <li key={ingredient.id}>
                            {ingredient.name} (Need {missingAmount} more)
                          </li>
                        );
                      })}
                    </ul>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/recipe/${recipe.id}`}>
                    <Button size="small" color="primary">
                      View Recipe
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default RecipeSuggestions;
