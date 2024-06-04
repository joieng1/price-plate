"use client"
import React, { useState, useEffect } from "react";
import styles from './createRecipe.module.css';
import { Box, Button, List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, TextField } from "@mui/material";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { IRecipeIngredient } from "@/database/recipeSchema"

function CreatedIngredientsList({ ingredientList, checked, handleToggle, handleUnitChange, units }: {
  ingredientList: IRecipeIngredient[];
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
                  primary={`${ingredient.recipeIngredientName}`}
                  secondary={`$${ingredient.costPerUnit.toFixed(2)} per ${ingredient.unitType}`}
                  className={styles.ingredientName}
                />
  
                <TextField
                  type="number"
                  value={units[ingredient.recipeIngredientName] || ''}
                  onChange={handleUnitChange(ingredient.recipeIngredientName)}
                  label="Enter Units"
                  inputProps={{ min: 0, max: 99999999999}}
                  className={styles.ingredientfield}
                />
  
                <div className={styles.secondaryAction}>
                  <ListItemText
                    primary={`Cost: $${(ingredient.costPerUnit * (units[ingredient.recipeIngredientName] || 0)).toFixed(2)}`}
                    className={styles.costText}
                  />
                  <Checkbox 
                    edge="end"
                    onChange={handleToggle(ingredient.recipeIngredientName)}
                    checked={checked.indexOf(ingredient.recipeIngredientName) !== -1 && units[ingredient.recipeIngredientName] > 0}
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
  const [createdIngredients, setIngredients] = useState<IRecipeIngredient[]>([]);
  const { push } = useRouter();

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

        const data = await response.json();
        setIngredients(data);
      }
      catch(error){
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

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

  const filteredIngredients = createdIngredients.filter((ingredient) => {
    return ingredient.recipeIngredientName.toLowerCase().includes(searchInput.toLowerCase());
  });

  const totalCost = Object.keys(units).reduce((sum, key) => {
    const ingredient = createdIngredients.find(i => i.recipeIngredientName === key);
    if (ingredient && checked.includes(ingredient.recipeIngredientName)) {
      return sum + (ingredient.costPerUnit * (units[key] || 0));
    }
    return sum;
  }, 0);

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try{
      e.preventDefault()

      const token = localStorage.get("jwtToken");
      const userID = localStorage.get("userID");
      const recipeIngredients = checked.map(ingredientName => {
        const recipeIngredient = createdIngredients.find(i => i.recipeIngredientName == ingredientName);

        if (!recipeIngredient) {
          throw new Error(`${ingredientName} Not Found`);
        }

        return {
          recipeingredientName: ingredientName,
          unitType: recipeIngredient.unitType,
          numberUnits: units[ingredientName],
          costPerUnit: recipeIngredient.costPerUnit,
          cost: recipeIngredient.costPerUnit * units[ingredientName]
        };

      });

      alert(recipeIngredients);

      const response = await fetch("/api/recipe", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userID: userID,
          recipeName: 'Recipe',
          recipeIngredients: recipeIngredients,
          totalCost: totalCost
        })
      });

      if(!response.ok){
        throw new Error(`Failed to create recipe status: ${response.status}`);
      }
      push('/home');

    }
    catch (error) {
      console.error("Error", error);
    }
  }

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
          <Button variant="contained" className={styles.createbutton} color="success" onClick={handleSubmit}>Create Recipe</Button>
        </Link> 

      </div>
    </div>
  );
};

export default CreateRecipePage;