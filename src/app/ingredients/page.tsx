"use client";
import React, { useState, useEffect, use } from "react";
import styles from "./ingredients.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import withAuth from "@/middleware/withAuth";

interface Ingredient {
  _id: string;
  userID: string;
  ingredientName: string;
  brand: string;
  unitType: string;
  pricePerUnit: number;
  vendor: string;
}

function IngredientsList({
  ingredientList,
  refreshIngredients,
}: {
  ingredientList: Ingredient[];
  refreshIngredients: () => void;
}) {
  //deletes ingredient
  const handleClick = async (ingredientId: string) => {
    const token = localStorage.getItem("jwtToken");
    console.log("Attempting to delete ", ingredientId);
    try {
      const response = await fetch(`/api/ingredient/${ingredientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Deleted");
      refreshIngredients();
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      alert("Delete failed");
      // Handle error
    }
  };

  return (
    <Box>
      <List>
        {ingredientList.map((ingredient, index) => (
          <ListItem key={index} className={styles.ingredient}>
            <ListItemText
              className={styles.ingredientfield}
              primary={`${ingredient.ingredientName}`}
              secondary={`$${ingredient.pricePerUnit} per ${ingredient.unitType}`}
            />
            {/* <ListItemText className = {styles.ingredientfield} primary={`$${ingredient.unit_cost} per unit`} /> */}
            <div className={styles.container}>
              <Link href={`/ingredientCard/${ingredient._id}`}>
                <Button
                  variant="contained"
                  className={styles.moreinfo}
                  color="success"
                  data-test={`more-info-${ingredient.ingredientName}`}
                >
                  More Info
                </Button>
              </Link>
              <Button
                variant="contained"
                className={styles.moreinfo}
                color="error"
                onClick={() => handleClick(ingredient._id)}
                data-test = "delete-button"
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
      placeholder="Search Ingredient"
      onChange={onChange}
      value={value}
    />
  );
};

function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchIngredients = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const userID = localStorage.getItem("userID");

      const response = await fetch(`/api/ingredient?userID=${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ingredients");
      }

      const data: Ingredient[] = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
    return ingredient.ingredientName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  return (
    <div className={styles.ingredientsPage}>
      <div className={styles.ingredientBox}>
        <SearchBar onChange={handleChange} value={searchInput} />
        {filteredIngredients.length === 0 ? (
          <p>No ingredients found</p>
        ) : (
          <IngredientsList
            ingredientList={filteredIngredients}
            refreshIngredients={fetchIngredients}
          />
        )}
        <Link href="/createIngredient">
          <Button
            variant="contained"
            className={styles.createbutton}
            color="success"
            data-test="create-ingredient-button"
          >
            Create New Ingredient
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(IngredientsPage);
