"use client"
import React, { useState } from "react";
import styles from "./ingredients.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from 'next/link';

interface Ingredient {
  ingredientName: string;
  unit_cost: number;
}

const ingredientList: Ingredient[] = [
  { ingredientName: 'Flour', unit_cost: 2.99 },
  { ingredientName: 'Sugar', unit_cost: 1.49 },
  { ingredientName: 'Eggs', unit_cost: 0.99 },
  { ingredientName: 'Bread', unit_cost: 0.35 },
  { ingredientName: 'Apples', unit_cost: 0.82 },
  { ingredientName: 'Sourdough', unit_cost: 0.43 },
];

function IngredientsList({ ingredientList }: { ingredientList: Ingredient[] }) {
  return (
    <Box>
      <List>
        {ingredientList.map((ingredient, index) => (
          <ListItem key={index} className={styles.ingredient}>
            <ListItemText className = {styles.ingredientfield} 
              primary={`${ingredient.ingredientName}`} 
              secondary={`$${ingredient.unit_cost} per unit`}/>
            {/* <ListItemText className = {styles.ingredientfield} primary={`$${ingredient.unit_cost} per unit`} /> */}
            <Link href="/recipeCard">
              <Button variant="contained" className = {styles.moreinfo}>More Info</Button>
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
      placeholder="Search Ingredient"
      onChange={onChange}
      value={value}
    />
  );
};

export default function IngredientsPage() {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredIngredients = ingredientList.filter((ingredient) => {
    return ingredient.ingredientName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className={styles.ingredientsPage}>
      <div className={styles.ingredientBox}>
        <SearchBar onChange={handleChange} value={searchInput} />
          {filteredIngredients.length === 0 ? (
            <p>No ingredients found</p>
              ) : (
            <IngredientsList ingredientList={filteredIngredients} />
          )}
        <Link href="/createIngredient">
          <Button variant="contained" className={styles.createbutton} color="success">Create New Ingredient</Button>
        </Link> 
      </div>
    </div>
  );
}
