import React, { useState, useEffect } from "react";
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
  Chip,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
 

function RecipeSuggestions() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());
  const [searchPerformed, setSearchPerformed] = useState(false); 

  
  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(savedInventory);
  }, []);

  const handleChipClick = (ingredient) => {
    const ingredientList = new Set(
      ingredients.split(",").map((item) => item.trim()).filter(Boolean)
    );

    if (selectedIngredients.has(ingredient)) {
      ingredientList.delete(ingredient);
      setSelectedIngredients((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(ingredient);
        return updatedSet;
      });
    } else {
      ingredientList.add(ingredient);
      setSelectedIngredients((prev) => new Set(prev).add(ingredient));
    }

    setIngredients([...ingredientList].join(", "));
  };

  const fetchRecipes = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    setSearchPerformed(true); 
    try {
      const { data: recipeSummaries } = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=20&apiKey=${process.env.REACT_APP_API_KEY}`
      );

      const detailedRecipes = await Promise.all(
        recipeSummaries.map((recipe) =>
          axios.get(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.REACT_APP_API_KEY}&imageType=png`
          )
        )
      );

      const fullRecipes = recipeSummaries.map((recipe, index) => ({
        ...recipe,
        fullIngredients: detailedRecipes[index].data.extendedIngredients,
      }));

      setRecipes(fullRecipes);
    } catch (error) {
      if (error.response?.status === 402) {
        alert("Rate limit exceeded. Please try again later.");
      } else {
        console.error("Error fetching recipes:", error);
        alert("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  const getMissingIngredients = (fullIngredients) => {
    const searchedIngredientsSet = new Set(
      ingredients.split(",").map((item) => item.trim().toLowerCase())
    );

    return fullIngredients
      .filter((ingredient) => !searchedIngredientsSet.has(ingredient.name.toLowerCase()))
      .map((ingredient) => ingredient.name);
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Find Recipes Based on Ingredients
      </Typography>

      
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        {inventory.map((item, index) => (
          <Chip
            key={index}
            label={item.name}
            onClick={() => handleChipClick(item.name)}
            color={selectedIngredients.has(item.name) ? "secondary" : "primary"}
            clickable
          />
        ))}
      </Box>

      
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
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : recipes.length === 0 && searchPerformed ? (
        <Typography>No recipes found. Try adding more ingredients!</Typography>
      ) : (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
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
                    Missing Ingredients:
                    <ul>
                      {getMissingIngredients(recipe.fullIngredients).map(
                        (ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        )
                      )}
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
