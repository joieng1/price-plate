'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ingredientList = [
  { ingredientName: 'Flour', unit_cost: 2.99},
  { ingredientName: 'Sugar', unit_cost: 1.49},
  { ingredientName: 'Eggs', unit_cost: 0.99},
  { ingredientName: 'Bread Loaf', unit_cost: 0.35}
]

function IngredientsList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          {ingredientList.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${ingredient.ingredientName}`}/>
              <ListItemText primary={`$${ingredient.unit_cost} per unit`}/>
              <Button variant="contained">More Info</Button>
            </ListItem>
          ))}
        </List>
    </Box>
  );
}

export default function ingredientsPage(){
  return (
    <div>
      <IngredientsList/>
      <Button variant="contained">Create New Ingredient</Button>
    </div>
  )
}


  