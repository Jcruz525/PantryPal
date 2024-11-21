import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Box } from '@mui/material';

function ShoppingList() {
  const [missingIngredients, setMissingIngredients] = useState([
    'Milk',
    'Eggs',
    'Flour',
    'Butter',
  ]);  // Example missing ingredients

  return (
    <Box>
      <h2>Shopping List</h2>
      <List>
        {missingIngredients.map((ingredient, index) => (
          <ListItem key={index}>
            <ListItemText primary={ingredient} />
            <Button variant="contained" color="success">
              Add to Cart
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ShoppingList;
