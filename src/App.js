import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Inventory from './Inventory';
import RecipeSuggestions from './RecipeSuggestions';
import ShoppingList from './ShoppingList';
import RecipeDetail from './RecipeDetail';

function App() {
  const [inventory, setInventory] = useState([]); // Store inventory

  const handleAddToInventory = (ingredient) => {
    setInventory((prevInventory) => [...prevInventory, ingredient]);
  };

  const handleRemoveFromInventory = (ingredient) => {
    setInventory((prevInventory) => prevInventory.filter(item => item !== ingredient));
  };

  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Pantry Pal
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/inventory">Inventory</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Routes>
          <Route
            path="/"
            element={<RecipeSuggestions inventory={inventory} />}
          />
          <Route
            path="/inventory"
            element={
              <Inventory
                inventory={inventory}
                onAdd={handleAddToInventory}
                onRemove={handleRemoveFromInventory}
              />
            }
          />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
