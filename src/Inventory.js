import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useScreenSize } from "./screenContext";

const popularCategories = [
  {
    category: "Meat",
    items: [
      "Chicken",
      "Beef",
      "Pork",
      "Lamb",
      "Turkey",
      "Bacon",
      "Sausage",
      "Ground Beef",
      "Salmon",
      "Tuna",
      "Shrimp",
      "Chicken Breast",
      "Steak",
      "Ham",
      "Duck",
      "Cod",
    ],
  },
  {
    category: "Dairy",
    items: [
      "Milk",
      "Eggs",
      "Cheese",
      "Butter",
      "Yogurt",
      "Cream",
      "Sour Cream",
      "Cottage Cheese",
      "Parmesan",
      "Mozzarella",
      "Cheddar",
      "Feta",
      "Ricotta",
      "Heavy Cream",
      "Cream Cheese",
    ],
  },
  {
    category: "Vegetables",
    items: [
      "Carrots",
      "Potatoes",
      "Onions",
      "Garlic",
      "Tomatoes",
      "Lettuce",
      "Spinach",
      "Kale",
      "Cucumbers",
      "Bell Peppers",
      "Zucchini",
      "Broccoli",
      "Cauliflower",
      "Asparagus",
      "Squash",
      "Sweet Potatoes",
      "Mushrooms",
      "Green Beans",
      "Peas",
      "Brussels Sprouts",
    ],
  },
  {
    category: "Fruits",
    items: [
      "Apples",
      "Bananas",
      "Oranges",
      "Lemons",
      "Strawberries",
      "Blueberries",
      "Pineapple",
      "Mango",
      "Peach",
      "Plums",
      "Grapes",
      "Avocado",
      "Raspberries",
      "Pears",
      "Cherries",
      "Pomegranate",
      "Kiwi",
      "Papaya",
    ],
  },
];

const categoryMap = popularCategories.reduce((map, cat) => {
  cat.items.forEach((item) => (map[item] = cat.category));
  return map;
}, {});

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [manualEntryCategory, setManualEntryCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [user, setUser] = useState(null);

  const { isSmallScreen } = useScreenSize();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  useEffect(() => {
    if (user) {
      const savedInventory =
        JSON.parse(localStorage.getItem(`${user.email}_inventory`)) || [];
      setInventory(savedInventory);
      setSelectedItems(new Set(savedInventory.map((item) => item.name)));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `${user.email}_inventory`,
        JSON.stringify(inventory)
      );
    }
  }, [inventory, user]);

  const handleAddManual = (category) => {
    if (
      newItem.trim() &&
      !inventory.some(
        (item) => item.name.toLowerCase() === newItem.trim().toLowerCase()
      )
    ) {
      setInventory((prev) => [...prev, { name: newItem.trim(), category }]);
      setNewItem("");
      setManualEntryCategory(null);
    }
  };

  const handleCategoryClick = (item) => {
    if (selectedItems.has(item)) {
      setInventory((prev) => prev.filter((i) => i.name !== item));
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item);
        return newSet;
      });
    } else {
      setInventory((prev) => [
        ...prev,
        { name: item, category: categoryMap[item] || "Miscellaneous" },
      ]);
      setSelectedItems((prev) => new Set(prev).add(item));
    }
  };

  const handleRemoveItem = (item) => {
    setInventory((prev) => prev.filter((i) => i.name !== item.name));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(item.name);
      return newSet;
    });
  };

  const handleClearAllInventory = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all items from your inventory?"
    );
    if (confirmClear) {
      setInventory([]);
      setSelectedItems(new Set());
      localStorage.removeItem("inventory");
    }
  };

  const groupedInventory = inventory.reduce((acc, item) => {
    const cat = item.category || "Miscellaneous";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "48%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ overflowY: "auto", maxHeight: "475px", padding: 1 }}>
          <Typography variant="h6" gutterBottom>
            Your Inventory
          </Typography>
          {Object.entries(groupedInventory).map(([category, items]) => (
            <Box key={category} sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                >
                  {category}
                </Typography>
                <IconButton onClick={() => setManualEntryCategory(category)}>
                  <AddIcon />
                </IconButton>
              </Box>
              {manualEntryCategory === category && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TextField
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    label={`Add to ${category}`}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 2, flexGrow: 1 }}
                  />
                  <Button
                    onClick={() => handleAddManual(category)}
                    variant="contained"
                    color="primary"
                  >
                    Add
                  </Button>
                </Box>
              )}
              <Grid container spacing={2}>
                {items.map((item, idx) => (
                  <Grid item xs={6} key={idx}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "1px solid #ccc",
                        p: 1,
                        borderRadius: 2,
                      }}
                    >
                      <Typography>{item.name}</Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
        {inventory.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={handleClearAllInventory}
          >
            Clear All Inventory
          </Button>
        )}
      </Box>
      {!isSmallScreen && (
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      )}

      <Box
        sx={{
          width: isSmallScreen ? "100%" : "48%",
          overflowY: "auto",
          maxHeight: "525px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Popular Categories
        </Typography>
        {popularCategories.map((category, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {category.category}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {category.items.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onClick={() => handleCategoryClick(item)}
                  color={selectedItems.has(item) ? "secondary" : "primary"}
                  clickable
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Inventory;
