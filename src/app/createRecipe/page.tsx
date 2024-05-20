"use client"
import React, { useState } from "react";
import styles from './createRecipe.module.css';
import { Box, Button, List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, TextField } from "@mui/material";
import Link from 'next/link';

interface CreatedIngredient {
  ingredientName: string;
  unitType: string;
  pricePerUnit: number;
}

const createdingredientList: CreatedIngredient[] = [
  { ingredientName: 'Flour', unitType: 'kg', pricePerUnit: 5.99 },
  { ingredientName: 'Sugar', unitType: 'pound', pricePerUnit: 4.49 },
  { ingredientName: 'Eggs', unitType: 'dozen', pricePerUnit: 3.99 },
  { ingredientName: 'Bread', unitType: 'loaf', pricePerUnit: 5.35 },
  { ingredientName: 'Apples', unitType: 'apple', pricePerUnit: 0.82 },
  // { ingredientName: 'Sourdough', unitType: 'loaf', pricePerUnit: 3.43 },
];

function CreatedIngredientsList({ ingredientList, checked, handleToggle, handleUnitChange, units }: {
  ingredientList: CreatedIngredient[];
  checked: string[];
  handleToggle: (ingredientName: string) => () => void;
  handleUnitChange: (ingredientName: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  units: { [key: string]: number };}) {

    return (
      <Box >
        <List>
          {ingredientList.map((ingredient, index) => (
            <ListItem key={index} className={styles.ingredient} >
            
              <div className={styles.ingredientContent}>
                <ListItemText
                  primary={`${ingredient.ingredientName}`}
                  secondary={`$${ingredient.pricePerUnit} per ${ingredient.unitType}`}
                  className={styles.ingredientName}
                />
  
                <TextField
                  type="number"
                  value={units[ingredient.ingredientName] || ''}
                  onChange={handleUnitChange(ingredient.ingredientName)}
                  label="Enter Units"
                  inputProps={{ min: 0, max: 99999999999}}
                  className={styles.ingredientfield}
                />
  
                <div className={styles.secondaryAction}>
                  <ListItemText
                    primary={`Cost: $${(ingredient.pricePerUnit * (units[ingredient.ingredientName] || 0)).toFixed(2)}`}
                    className={styles.costText}
                  />
                  <Checkbox 
                    edge="end"
                    onChange={handleToggle(ingredient.ingredientName)}
                    checked={checked.indexOf(ingredient.ingredientName) !== -1 && units[ingredient.ingredientName] > 0}
                  />
                </div>
              </div>
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

const CreateRecipePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);
  const [units, setUnits] = useState<{ [key: string]: number }>({});

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleToggle = (ingredientName: string) => () => {
    const currentIndex = checked.indexOf(ingredientName);
    const newChecked = [...checked];
    if (currentIndex === -1 && units[ingredientName] > 0) {
      newChecked.push(ingredientName);
    } 
    else if(currentIndex !== -1 && units[ingredientName] != 0){
      newChecked.splice(currentIndex, 1);
      units[ingredientName] = 0; 
    }
    setChecked(newChecked);
  };

  const handleUnitChange = (ingredientName: string) => (e: React.ChangeEvent<HTMLInputElement>) => { 
    const newUnits = { ...units, [ingredientName]: parseFloat(e.target.value) || 0 };
    const currentIndex = checked.indexOf(ingredientName);
    if(units[ingredientName] == 0 && currentIndex != -1){
      const newChecked = [...checked];
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }
    setUnits(newUnits);
  };

  const filteredIngredients = createdingredientList.filter((ingredient) => {
    return ingredient.ingredientName.toLowerCase().includes(searchInput.toLowerCase());
  });

  const totalCost = Object.keys(units).reduce((sum, key) => {
    const ingredient = createdingredientList.find(i => i.ingredientName === key);
    if (ingredient && checked.includes(ingredient.ingredientName)) {
      return sum + (ingredient.pricePerUnit * (units[key] || 0));
    }
    return sum;
  }, 0);

  return (
    <div className={styles.ingredientsPage}>
      <div className={styles.ingredientBox}>

        <SearchBar onChange={handleSearch} value={searchInput} />
        {filteredIngredients.length === 0 ? (

          <p>No ingredients found</p>
            ) : (

          <CreatedIngredientsList
            ingredientList={filteredIngredients}
            checked={checked}
            handleToggle={handleToggle}
            handleUnitChange={handleUnitChange}
            units={units}
          />

        )}

        <div className={styles.totalCost}>
          <h2>Total Cost</h2>
          <h2>{totalCost.toFixed(2)}</h2>
        </div>

        <Link href="/home">
          <Button variant="contained" className={styles.createbutton} color="success">Create Recipe</Button>
        </Link> 

      </div>
    </div>
  );
};

export default CreateRecipePage;
