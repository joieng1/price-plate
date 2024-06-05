"use client"
import React, { useState } from "react";
import styles from "./homepage.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from 'next/link';

interface Recipe {
  recipeName: string;
  unit_cost: number;
}

const recipeList: Recipe[] = [
  { recipeName: 'Chocolate Cake', unit_cost: 10.44 },
  { recipeName: 'Pad Thai', unit_cost: 12.99 },
  { recipeName: 'Cobb Salad', unit_cost: 5.53 },
];

function RecipeList({ recipeList }: { recipeList: Recipe[] }) {
  return (
    <Box>
      <List>
        {recipeList.map((recipe,index) => (
          <ListItem key={index} className={styles.recipe}>
            <ListItemText className = {styles.ingredientfield} 
              primary={`${recipe.recipeName}`} 
              secondary={`$${recipe.unit_cost} per batch`}/>
            <Link href="/recipeCard">
              <Button variant="contained" className = {styles.view} color = "success" >View</Button>
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

export default function RecipePage() {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredIngredients = recipeList.filter((recipe) => {
    return recipe.recipeName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className={styles.page}>
      <div className={styles.recipeBox}>
        <SearchBar onChange={handleChange} value={searchInput} />
        {filteredIngredients.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          <RecipeList recipeList={filteredIngredients} />
        )}
        <Link href="/createRecipe">
          <Button variant="contained" className={styles.createbutton} color="success">Create New Recipe</Button>
        </Link> 
      </div>
    </div>
  );
}
