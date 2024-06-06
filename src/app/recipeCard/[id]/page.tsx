"use client";
import React, { FunctionComponent, useState, useEffect } from "react";
import styles from "../recipeCard.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import withAuth from "@/middleware/withAuth";
import { UnitTypeEnum } from "@/types/unitTypes";

interface Ingredient {
  total_cost?: number;
  ingredientID: string;
  ingredientName: string;
  numberUnits: number;
  price: number;
  unitType: UnitTypeEnum;
}

interface Recipe {
  recipeName: string;
  totalCost: number;
  recipeIngredients: Ingredient[];
  _id: string;
}

const defaultRecipe: Recipe = {
  recipeName: "Chocolate Cake",
  totalCost: 0,
  recipeIngredients: [
    {
      ingredientName: "Flour",
      price: 2.99,
      numberUnits: 2,
      total_cost: 0,
      ingredientID: "",
      unitType: UnitTypeEnum.G,
    },
  ],
  _id: "",
};

function calculateIngredientTotalCost(recipe: Recipe) {
  recipe.recipeIngredients.forEach((ingredient) => {
    ingredient.total_cost = ingredient.numberUnits * ingredient.price;
  });
}

function calculateTotalRecipeCost(recipe: Recipe): number {
  return recipe.recipeIngredients.reduce(
    (total, ingredient) => total + (ingredient.total_cost || 0),
    0
  );
}

function IngredientsList({
  ingredients,
  handleClick,
}: {
  ingredients: Ingredient[];
  handleClick: (ingredientID: string) => void;
}) {
  return (
    <Box>
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index} className={styles.ingredient}>
            <ListItemText
              className={styles.ingredientfield}
              primary={`${ingredient.ingredientName}`}
              secondary={`${ingredient.numberUnits} ${ingredient.unitType}`}
            />
            <p className={styles.totalcost}>
              Total Cost: ${ingredient.total_cost?.toFixed(2)}
            </p>
            {/* Display total cost */}
            <Link href={`/ingredientCard/${ingredient.ingredientID}`}>
              <Button variant="contained" className={styles.moreinfo}>
                More Info
              </Button>
            </Link>
            {/* <Button
              variant="contained"
              className={styles.moreinfo}
              color="error"
              onClick={() => handleClick(ingredient.ingredientID)}
            >
              Delete
            </Button> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const SearchBar = ({
  onChange,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
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

interface RecipeCardProps {
  params: {
    id: string;
  };
}
const RecipeCard: FunctionComponent<RecipeCardProps> = ({ params }) => {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);

  const [searchInput, setSearchInput] = useState<string>("");

  // Calculate the total cost of ingredients before rendering
  calculateIngredientTotalCost(recipe);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClick = async (ingredientID: string) => {
    const token = localStorage.getItem("jwtToken");
    console.log("Attempting to delete ", ingredientID);
    try {
      const response = await fetch(
        `/api/recipe/${recipe._id}/${ingredientID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Deleted");
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      alert("Delete failed");
      // Handle error
    }
  };

  const filteredIngredients = recipe.recipeIngredients.filter((ingredient) => {
    return ingredient.ingredientName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const totalRecipeCost = calculateTotalRecipeCost(recipe);
  useEffect(() => {
    const fetchRecipe = async () => {
      const id = params.id;

      try {
        const token = localStorage.getItem("jwtToken");

        const response = await fetch(`/api/recipe/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [params.id]);

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
          <IngredientsList
            handleClick={handleClick}
            ingredients={filteredIngredients}
          />
        )}
        <Link href="/createIngredient">
          <Button
            variant="contained"
            className={styles.addbutton}
            color="success"
          >
            Add Ingredient
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default withAuth(RecipeCard);
