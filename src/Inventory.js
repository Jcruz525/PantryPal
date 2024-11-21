import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Box } from "@mui/material";

function Inventory({ inventory, onAdd, onRemove }) {
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");

  const handleAddIngredient = () => {
    if (ingredient.trim() && amount > 0 && unit.trim()) {
      onAdd({ name: ingredient, amount, unit });
      setIngredient("");
      setAmount(0);
      setUnit("");
    }
  };

  return (
    <Box>
      <h2>Your Inventory</h2>
      <TextField
        label="Ingredient Name"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        fullWidth
      />
      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        type="number"
      />
      <TextField
        label="Unit (e.g., grams, mL)"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddIngredient} variant="contained" sx={{ mt: 2 }}>
        Add Ingredient
      </Button>
      <List sx={{ mt: 3 }}>
        {inventory.map((ingredient, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`}
            />
            <Button onClick={() => onRemove(ingredient)} color="error">
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Inventory;
