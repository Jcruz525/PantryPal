import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";

const SPOONACULAR_API_KEY = "3c62fbe73b374ff9a5386f7327e9653a";

function RecipeDetail() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
      setLoading(false);
    };

    fetchRecipeDetail();
  }, [id]); 

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 4 }}>
        Recipe not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={recipe.image}
          alt={recipe.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {recipe.title}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Servings: {recipe.servings} | Ready in: {recipe.readyInMinutes} minutes
          </Typography>
          <Typography variant="body1" paragraph>
            {recipe.summary.replace(/(<([^>]+)>)/gi, "")}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Ingredients
          </Typography>
          <List>
            {recipe.extendedIngredients.map((ingredient) => (
              <ListItem key={ingredient.id}>
                <ListItemText
                  primary={ingredient.name}
                  secondary={`Amount: ${ingredient.amount} ${ingredient.unit}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Instructions
          </Typography>
          <Typography variant="body1" paragraph>
            {recipe.instructions.replace(/(<([^>]+)>)/gi,"")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href={recipe.sourceUrl}
            target="_blank"
            sx={{ mt: 3 }}
          >
            View Full Recipe
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecipeDetail;
