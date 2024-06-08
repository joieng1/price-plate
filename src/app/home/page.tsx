"use client";
import React, { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import withAuth from "@/middleware/withAuth";

interface Recipe {
  _id: string;
  userID: string;
  recipeName: String;
  totalCost: Number;
}

const handleDelete = async (
  recipe: Recipe,
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
) => {
  try {
    var result = confirm(`Confirming To Delete ${recipe.recipeName}`);
    if (result) {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`/api/recipe/${recipe._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((r) => r._id !== recipe._id)
        );
      } else {
        console.error("Failed to delete recipe");
      }
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
};

function RecipeList({
  recipeList,
  setRecipes,
}: {
  recipeList: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}) {
  return (
    <Box>
      <List>
        {recipeList.map((recipe, index) => (
          <ListItem key={index} className={styles.recipe}>
            <ListItemText
              className={styles.recipefield}
              primary={recipe.recipeName}
              secondary={`$${recipe.totalCost.toFixed(2)} per batch`} // Use totalCost for price per batch
            />
            <div className={styles.buttonContainer}>
              <Link href={`/recipeCard/${recipe._id}`}>
                <Button
                  variant="contained"
                  className={`${styles.view} ${styles.blockButton}`}
                  color="success"
                  data-test="view"
                >
                  View
                </Button>
              </Link>
              <Button
                variant="contained"
                className={`${styles.view} ${styles.blockButton}`}
                color="error"
                onClick={() => handleDelete(recipe, setRecipes)}
                data-test = "delete-recipe"
              >
                Delete
              </Button>
            </div>
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
          <RecipeList recipeList={filteredRecipes} setRecipes={setRecipes} />
        )}
        <Link href="/createRecipe">
          <Button
            variant="contained"
            className={styles.createbutton}
            color="success"
            data-test="create-recipe-button"
          >
            Create New Recipe
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(RecipePage);
