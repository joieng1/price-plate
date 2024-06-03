"use client"
import React, { useState, useEffect, use } from "react";
import styles from "./ingredients.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from 'next/link';

interface Ingredient {
  ingredientName: string;
  unitType: string;
  pricePerUnit: number;
}

function IngredientsList({ ingredientList }: { ingredientList: Ingredient[] }) {
  return (
    <Box>
      <List>
        {ingredientList.map((ingredient, index) => (
          <ListItem key={index} className={styles.ingredient}>
            <ListItemText className = {styles.ingredientfield} 
              primary={`${ingredient.ingredientName}`} 
              secondary={`$${ingredient.pricePerUnit} per ${ingredient.unitType}`}/>
            {/* <ListItemText className = {styles.ingredientfield} primary={`$${ingredient.unit_cost} per unit`} /> */}
            <Link href="/ingredientCard">
              <Button variant="contained" className = {styles.moreinfo} color = "success" >More Info</Button>
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
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchIngredients = async () => {
      try{

        const token = localStorage.getItem('jwtToken');
        const userID = localStorage.getItem('userID');

        const response = await fetch(`/api/ingredient?userID=${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if(!response.ok){
          throw new Error('Failed to fetch ingredients');
        }

        const data: Ingredient[] = await response.json();
        setIngredients(data);
      }
      catch(error){
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
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
