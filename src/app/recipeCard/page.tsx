"use client"
import React, { useState } from "react";
import styles from "./recipeCard.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from 'next/link';

interface Ingredient {
  ingredientName: string;
  unit_cost: number;
  units: number;
  total_cost: number;
}

interface Recipe {
  recipeName: string;
  ingredients: Ingredient[];
}

interface IngredientsPageProps {
  recipe?: Recipe; 
}

const exampleRecipe: Recipe = {
  recipeName: "Chocolate Cake",
  ingredients: [
    { ingredientName: 'Flour', unit_cost: 2.99, units: 2, total_cost: 0 },
    { ingredientName: 'Sugar', unit_cost: 1.49, units: 1, total_cost: 0 },
    { ingredientName: 'Eggs', unit_cost: 0.99, units: 3, total_cost: 0 },
  ]
};

function calculateIngredientTotalCost(recipe: Recipe) {
  recipe.ingredients.forEach(ingredient => {
    ingredient.total_cost = ingredient.unit_cost * ingredient.units;
  });
}

function calculateTotalRecipeCost(recipe: Recipe): number {
  return recipe.ingredients.reduce((total, ingredient) => total + ingredient.total_cost, 0);
}

function IngredientsList({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <Box>
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index} className={styles.ingredient}>
            <ListItemText className={styles.ingredientfield}
              primary={`${ingredient.ingredientName}`}
              secondary={`${ingredient.units} units`} />
            <p className={styles.totalcost}>Total Cost: ${ingredient.total_cost.toFixed(2)}</p> {/* Display total cost */}
            <Link href="/recipeCard">
              <Button variant="contained" className={styles.moreinfo}>More Info</Button>
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

function RecipeCardHelper({ recipe }: {recipe: Recipe}) {
  const [searchInput, setSearchInput] = useState<string>("");

  // Calculate the total cost of ingredients before rendering
  calculateIngredientTotalCost(recipe);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredIngredients = recipe.ingredients.filter((ingredient) => {
    return ingredient.ingredientName.toLowerCase().includes(searchInput.toLowerCase());
  });

  const totalRecipeCost = calculateTotalRecipeCost(recipe);

  return (
    <div className={styles.page}>
      <div className={styles.ingredientBox}>
        <div className={styles.header}>
          <div className={styles.name}>
            <p>{recipe.recipeName}</p>
          </div>
          <div className={styles.totalrecipecost}>
            <p>Total Recipe Cost: ${totalRecipeCost.toFixed(2)}</p>
          </div>
          <SearchBar onChange={handleChange} value={searchInput} />
        </div>
        {filteredIngredients.length === 0 ? (
          <p>No ingredients found</p>
        ) : (
          <IngredientsList ingredients={filteredIngredients} />
        )}
        <Link href="/createIngredient">
          <Button variant="contained" className={styles.addbutton} color="success">Add Ingredient</Button>
        </Link>
      </div>
    </div>
  );
}

export default function RecipeCard() {
  return (
    <RecipeCardHelper recipe={exampleRecipe}/>
  )
}

