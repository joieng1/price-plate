"use client";
import React, { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from 'next/link';
import withAuth from "@/middleware/withAuth";

interface Recipe {
  recipeName: string;
  totalCost: number;  // Ensure this matches the field from the database
}

function RecipeList({ recipeList }: { recipeList: Recipe[] }) {
  return (
    <Box>
      <List>
        {recipeList.map((recipe, index) => (
          <ListItem key={index} className={styles.recipe}>
            <ListItemText
              className={styles.ingredientfield}
              primary={recipe.recipeName}
              secondary={`$${recipe.totalCost.toFixed(2)} per batch`}  // Use totalCost for price per batch
            />
            <Link href="/recipeCard">
              <Button variant="contained" className={styles.view} color="success">View</Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const SearchBar = ({ onChange, value }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, value: string }) => {
  return (
    <input
      type="search"
      className={styles.search}
      placeholder="Search Recipe"
      onChange={onChange}
      value={value}
    />
  );
};

function RecipePage() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userID = localStorage.getItem("userID");
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`/api/recipe?userID=${userID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("An error occurred while fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.recipeName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className={styles.page}>
      <div className={styles.recipeBox}>
        <SearchBar onChange={handleChange} value={searchInput} />
        {filteredRecipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          <RecipeList recipeList={filteredRecipes} />
        )}
        <Link href="/createRecipe">
          <Button variant="contained" className={styles.createbutton} color="success">Create New Recipe</Button>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(RecipePage);
