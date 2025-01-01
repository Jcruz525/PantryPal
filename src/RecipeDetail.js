import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Button,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useParams } from "react-router-dom";



function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(savedInventory.map((item) => item.name.toLowerCase()));

    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&imageType=png`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
      setLoading(false);
    };

    fetchRecipeDetail();
  }, [id]);

  const highlightKeywords = (text) => {
    
    const keywords = ["bake", "boil", "mix", "stir", "cook", "heat", "chop", "slice"];
    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
    return text.replace(regex, (match) => `<strong>${match}</strong>`);
  };

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
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Servings: {recipe.servings} | Ready in: {recipe.readyInMinutes} minutes
          </Typography>

          
          <Typography variant="h5" sx={{ mt: 2 }}>
            Ingredients
          </Typography>
          <List>
            {recipe.extendedIngredients.map((ingredient) => {
              const isInPantry = inventory.includes(ingredient.name.toLowerCase());
              return (
                <ListItem key={ingredient.id}>
                  <ListItemIcon>
                    {isInPantry ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={ingredient.name}
                    secondary={`Amount: ${ingredient.amount} ${ingredient.unit}`}
                  />
                </ListItem>
              );
            })}
          </List>

          
          <Typography variant="h5" sx={{ mt: 4 }}>
            Instructions
          </Typography>
          <Box sx={{ mt: 2 }}>
            {recipe.instructions
              .replace(/(<([^>]+)>)/gi, "") 
              .split(". ") 
              .filter((step) => step.trim() !== "") 
              .map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    mb: 2,
                    padding: 2,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      width: "30px",
                      height: "30px",
                      lineHeight: "30px",
                      textAlign: "center",
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(step),
                    }}
                  />
                </Box>
              ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            href={recipe.sourceUrl}
            target="_blank"
            sx={{ mt: 4 }}
          >
            View Full Recipe
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecipeDetail;
