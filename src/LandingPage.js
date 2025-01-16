import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, Avatar,Grid2,CardContent,CardActions} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";


const LandingPage = () => {
    const [recipeData, setRecipeData] = useState(null);

useEffect(() => {
  const fetchRecipes = async () => {
    
    const storedData = localStorage.getItem("recipeData");
    const parsedData = storedData ? JSON.parse(storedData) : [];

    if (parsedData.length === 6) {
      setRecipeData(parsedData); 
      return;
    }

    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=6&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();

      if (data && data.recipes && data.recipes.length > 0) {
        const recipes = data.recipes.map((recipe) => ({
          image: recipe.image,
          title: recipe.title,
          id: recipe.id,
          timeToCook: recipe.readyInMinutes,
          servings: recipe.servings,
          difficulty: calculateDifficulty(recipe.readyInMinutes),
        }));

        localStorage.setItem("recipeData", JSON.stringify(recipes));
        setRecipeData(recipes);
      }
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };

  fetchRecipes();
}, []);

const calculateDifficulty = (time) => {
  if (time <= 20) return "Easy";
  if (time <= 40) return "Medium";
  return "Hard";
};

    
  const navigate = useNavigate();

  const [liked, setLiked] = useState([false, false]); 

  const toggleLike = (index) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);
  };

  
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: { xs: "center", md: "left" },
          mb: 6,
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
            paddingRight: { md: "5%" },
            width: "100%",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              color: "#333",
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Transform your pantry into a recipe powerhouse!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "#555",
              fontSize: { xs: "1rem", md: "1.2rem" },
              maxWidth: "500px",
            }}
          >
            Discover delicious recipes, organize your pantry, and get personalized suggestions—all in one place.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
              maxWidth: "200px",
              borderRadius: "11px"
            }}
          >
            Get Started
          </Button>
        </Box>

        
        <Box
          sx={{
            flex: 1,
            position: "relative", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/landingPageImage.svg" 
            alt="Landing Page"
            sx={{
              width: "690px",
              height: "500px",
              objectFit: "cover",
            }}
          />

         
          <Card
            sx={{
              position: "absolute",
              top: "75%",
              left: "5%",
              width: 200,
              padding: 2,
              borderRadius: "11px",
              backgroundColor: "white",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15), 0px 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#1976D2",
                borderRadius: "11px",
                padding: 2,
                color: "white",
                textAlign: "left",
              }}
            >
              <Box display="flex" justifyContent="left">
                {[...Array(5)].map((_, index) => (
                  <StarIcon key={index} style={{ color: "gold" }} />
                ))}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                "A fantastic way to discover recipes!"
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src="/Alice.png"
                  alt="Alice Johnson"
                  sx={{
                    width: 30,
                    height: 30,
                    mr: 1,
                  }}
                />
                <Typography variant="subtitle2">Alice J.</Typography>
              </Box>
              {liked[0] ? (
                <FavoriteIcon
                  sx={{
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => toggleLike(0)}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => toggleLike(0)}
                />
              )}
            </Box>
          </Card>

       
          <Card
            sx={{
              position: "absolute",
              bottom: "15%",
              right: "0%",
              width: 200,
              padding: 2,
              borderRadius: "11px",
              backgroundColor: "white",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15), 0px 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#1976D2",
                borderRadius: "11px",
                padding: 2,
                color: "white",
                textAlign: "left",
              }}
            >
              <Box display="flex" justifyContent="left">
                {[...Array(5)].map((_, index) => (
                  <StarIcon key={index} style={{ color: "gold" }} />
                ))}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                "An essential tool for home cooks!"
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src="/Jessica.png"
                  alt="Jessica M."
                  sx={{
                    width: 30,
                    height: 30,
                    mr: 1,
                  }}
                />
                <Typography variant="subtitle2">Jessica M.</Typography>
              </Box>
              {liked[1] ? (
                <FavoriteIcon
                  sx={{
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => toggleLike(1)}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => toggleLike(1)}
                />
              )}
            </Box>
          </Card>
        </Box>
      </Box>
      <Box sx={{ width: "100%", padding: 4, display: "flex", flexDirection: "row",flexWrap: "nowrap",mt: 20,}}>
      <Grid2 container spacing={10} justifyContent="center" flexWrap={"nowrap"}>
        
        <Grid2 item xs={12} sm={4}>
        <Grid2 item xs={12} sm={4}>
  <Card sx={{ display: "flex", flexDirection: "column", height: "350px", borderRadius: "20px" }}>
    <img
      src="exploreIcon.svg" 
      alt="Card1"
      style={{ width: "100px", height: "100px", objectFit: "cover", margin: "15px auto 10px auto",marginTop: "10px" }}
    />
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "center" }}>
      <Typography variant="h4" component="div">
        Explore
      </Typography>
      <Typography variant="body2" color="text.secondary">
      Discover featured recipes handpicked for you. Dive into culinary ideas that spark creativity and satisfy cravings.
      </Typography>
      <Typography variant="h6" component="div">
       Learn More
      </Typography>
    </CardContent>
  </Card>
</Grid2>

        </Grid2>

        <Grid2 item xs={12} sm={4}>
        <Grid2 item xs={12} sm={4}>
  <Card sx={{ display: "flex", flexDirection: "column", height: "350px", borderRadius: "20px" }}>
    <img
      src="PantryImg.svg" 
      alt="Card1"
      style={{ width: "100px", height: "100px", objectFit: "cover", margin: "15px auto 10px auto",marginTop: "10px" }}
    />
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent:"space-between", textAlign: "center" }}>
      <Typography variant="h4" component="div">
      Pantry Manager
      </Typography>
      <Typography variant="body2" color="text.secondary">
      Keep your pantry organized effortlessly. Add, edit, or manage your inventory to stay on top of your ingredients.
      </Typography>
      <Typography variant="h6" component="div">
       Learn More
      </Typography>
    </CardContent>
  </Card>
</Grid2>

        </Grid2>

        <Grid2 item xs={12} sm={4}>
        <Grid2 item xs={12} sm={4}>
  <Card sx={{ display: "flex", flexDirection: "column", height: "350px", borderRadius: "20px" }}>
    <img
      src="RecipeImg.svg"
      alt="Card1"
      style={{ width: "100px", height: "100px", objectFit: "cover", margin: "15px auto 10px auto",marginTop: "10px" }}
    />
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "center" }}>
      <Typography variant="h4" component="div">
        Recipe Finder
      </Typography>
      <Typography variant="body2" color="text.secondary">
      Discover featured recipes handpicked for you. Dive into culinary ideas that spark creativity and satisfy cravings.
      </Typography>
      <Typography variant="h6" component="div">
       Learn More
      </Typography>
    </CardContent>
  </Card>
</Grid2>

        </Grid2>
      </Grid2>
    </Box>
    <Box
        sx={{
          width: "100%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Typography variant="h4" sx={{ mb: 0, color: "black", fontWeight: "bold" }}>
          Discover Recipes
        </Typography>
        <Typography variant="h7" sx={{ mb: 8, color: "white",}}>
        Check our most popular recipes of this week
        </Typography>
        <Grid2 container spacing={4} display={"flex"} justifyContent="center" alignItems={"center"}>
        <Grid2 
  container 
  spacing={8} 
  display="flex" 
  justifyContent="center" 
  alignItems="center" 
>
  {recipeData ? (
    recipeData.map((recipe, index) => (
      <Grid2 item xs={12} sm={4} key={index} display={"flex"}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "300px",
            maxWidth: "300px",
            borderRadius: "20px",
            position: "relative",
          }}
        >
          <>
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 100,
                width: "100%",
                backgroundColor: "rgba(255,255,255, 0.75)",
                color: "#1976D2",
                padding: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    
    <img 
      src="timeIcon.svg" 
      alt="Time" 
      style={{ width: 15, height: 15, marginRight: 8 }} 
    />
    {recipe.timeToCook} min{" "}

 
    <img 
      src="people.svg" 
      alt="Servings" 
      style={{ width: 15, height: 15, marginLeft: 16, marginRight: 8 }} 
    />
    {recipe.servings} servings{" "}

    
    <img 
      src="diffIcon.svg" 
      alt="Difficulty" 
      style={{ width: 15, height: 15, marginLeft: 16, marginRight: 8 }} 
    />
    {recipe.difficulty}
  </Typography>
            </Box>
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  whiteSpace: "normal", 
                  wordWrap: "break-word",
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  display: "-webkit-box", 
                  WebkitLineClamp: 1, 
                  WebkitBoxOrient: "vertical", 
                  maxWidth: "300px", 
                }}
              >
                {recipe.title}
              </Typography>
              <CardActions>
                  <Link to={`/recipe/${recipe.id}`}>
                    <Button size="small" color="primary">
                      View Recipe
                    </Button>
                  </Link>
                </CardActions>
            </CardContent>
          </>
        </Card>
      </Grid2>
    ))
  ) : (
    <Grid2 item xs={12}>
      <Typography variant="body2" sx={{ padding: 2, textAlign: "center" }}>
        Loading...
      </Typography>
    </Grid2>
  )}
</Grid2>
        </Grid2>
      </Box>
      <Box
  sx={{
    width: "100%",
    color: "white",
    mt: 15,
  }}
>

  <Grid2 container spacing={5} justifyContent="center" sx={{ display: 'flex', flexDirection: 'row' }}>
    
    <Grid2 container xs={12} sm={4} display={"flex"} flexDirection={"row"}>
     
      <ul style={{ listStyle: "none", padding: 0, display:"flex", flexDirection: "column"}}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Menu
      </Typography>
        <li><Typography variant="body2">Home</Typography></li>
        <li><Typography variant="body2">Pantry</Typography></li>
        <li><Typography variant="body2">Recipes</Typography></li>
        <li><Typography variant="body2">About</Typography></li>
      </ul>
      <ul style={{ listStyle: "none", padding: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Categories
      </Typography>
        <li><Typography variant="body2">Breakfast</Typography></li>
        <li><Typography variant="body2">Lunch</Typography></li>
        <li><Typography variant="body2">Dinner</Typography></li>
        <li><Typography variant="body2">Desserts</Typography></li>
      </ul>
      <ul style={{ listStyle: "none", padding: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Socials
      </Typography>
        <li><Typography variant="body2">Instagram</Typography></li>
        <li><Typography variant="body2">Facebook</Typography></li>
        <li><Typography variant="body2">Youtube</Typography></li>
        <li><Typography variant="body2">Twitter</Typography></li>
      </ul>
    </Grid2>

    
    <Grid2 item xs={12} sm={4} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
    <img
                src="Salad.svg" 
                alt="Salad"
                style={{ width: "100px", height: "130px", objectFit: "cover" }}
              />
    </Grid2>

 
    <Grid2 item xs={12} sm={4} marginLeft={"20px"}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Subscribe to Our Newsletter
          <img
                src="Fried Eggs.svg" 
                alt="Eggs"
                style={{ width: "50px", height: "50px", objectFit: "cover", marginLeft: "15px"}}
              />
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginRight: "10px",
              width: "300px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "10px 20px",
              fontSize: "12px",
              borderRadius: "5px",
              width: "100px"
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Grid2>
  </Grid2>

  
  <Box sx={{ textAlign: "center", mt: 6, marginBottom: 3 }}>
    <Typography variant="body2">
      © 2024 Pantry Pal. All rights reserved.
    </Typography>
  </Box>
</Box>


    </Box>
  );
};

export default LandingPage;
