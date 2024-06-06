"use client";
import React, { useState, useEffect } from "react";
import styles from "./createRecipe.module.css";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { IRecipeIngredient } from "@/database/recipeSchema";
import { convertUnit } from "@/conversion";
import withAuth from "@/middleware/withAuth";
import { UnitTypeEnum } from "@/types/unitTypes";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type IIngredient = {
  _id: string;
  userID: string;
  ingredientName: string;
  brand: string;
  vendor: string;
  unitType: UnitTypeEnum;
  numberUnits: number;
  price: number;
  pricePerUnit: number;
};

function CreatedIngredientsList({
  ingredientList,
  checked,
  handleToggle,
  handleUnitChange,
  handleUnitTypeChange,
  units,
}: {
  ingredientList: IIngredient[];
  checked: string[];
  handleToggle: (ingredientName: string) => () => void;
  handleUnitChange: (
    ingredientName: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUnitTypeChange: (ingredientName: string, unit: UnitTypeEnum) => void;
  units: {
    [key: string]: {
      value: number;
      unitType: UnitTypeEnum;
      convertedPricePerUnit?: number;
    };
  };
}) {
  return (
    <Box>
      <List>
        {ingredientList.map((ingredient, index) => (
          <ListItem key={index} className={styles.ingredient}>
            <div className={styles.ingredientContent}>
              <ListItemText
                primary={`${ingredient.ingredientName}`}
                secondary={`$${
                  Math.floor(
                    (units[ingredient.ingredientName]?.convertedPricePerUnit ||
                      ingredient.pricePerUnit) * 100
                  ) / 100
                } per ${
                  units[ingredient.ingredientName]?.unitType ||
                  ingredient.unitType
                }`}
                className={styles.ingredientName}
              />

              <OutlinedInput
                type="number"
                label="Enter Units"
                className={styles.blackFontEdit}
                value={units[ingredient.ingredientName]?.value || ""}
                onChange={handleUnitChange(ingredient.ingredientName)}
                name="numberUnits"
                endAdornment={
                  <InputAdornment position="end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-[10rem]">
                        <div className="border-[1.5px] border-gray-300 rounded-md p-1 cursor-pointer">
                          {units[ingredient.ingredientName]?.unitType ||
                            "Select Unit Type"}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        {Object.values(UnitTypeEnum).map((unitType) => (
                          <DropdownMenuItem
                            key={unitType}
                            className="text-[1.2rem]"
                            onSelect={() =>
                              handleUnitTypeChange(
                                ingredient.ingredientName,
                                unitType
                              )
                            }
                          >
                            {unitType}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </InputAdornment>
                }
              />

              <div className={styles.secondaryAction}>
                <ListItemText
                  primary={`Cost: $${(
                    (units[ingredient.ingredientName]?.convertedPricePerUnit ||
                      ingredient.pricePerUnit) *
                    (units[ingredient.ingredientName]?.value || 0)
                  ).toFixed(2)}`}
                  className={styles.costText}
                />
                <Checkbox
                  edge="end"
                  onChange={handleToggle(ingredient.ingredientName)}
                  checked={
                    checked.indexOf(ingredient.ingredientName) !== -1 &&
                    (units[ingredient.ingredientName].value || 0) > 0
                  }
                />
              </div>
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

const CreateRecipePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);
  const [units, setUnits] = useState<{
    [key: string]: {
      value: number;
      unitType: UnitTypeEnum;
      convertedPricePerUnit?: number;
    };
  }>({});

  const [createdIngredients, setIngredients] = useState<IIngredient[]>([]);
  const [recipeName, setRecipeName] = useState<string>("");
  const { push } = useRouter();

  useEffect(() => {
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

        const data = await response.json();
        setIngredients(data);

        // Initialize units state
        const initialUnits = data.reduce(
          (acc: any, ingredient: IIngredient) => {
            acc[ingredient.ingredientName] = {
              value: 0,
              unitType: ingredient.unitType,
              convertedPricePerUnit: ingredient.pricePerUnit
            };
            return acc;
          },
          {}
        );

        setUnits(initialUnits);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
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
    if (currentIndex === -1 && units[ingredientName].value > 0) {
      newChecked.push(ingredientName);
    } else if (currentIndex !== -1 && units[ingredientName].value != 0) {
      newChecked.splice(currentIndex, 1);
      units[ingredientName].value = 0;
    }
    setChecked(newChecked);
  };

  const handleUnitChange =
    (ingredientName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUnits = {
        ...units,
        [ingredientName]: {
          ...units[ingredientName],
          value: parseFloat(e.target.value) || 0,
        },
      };
      setUnits(newUnits);
    };

  const filteredIngredients = createdIngredients.filter((ingredient) => {
    return String(ingredient.ingredientName)
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const handleUnitTypeChange = (
    ingredientName: string,
    newUnitType: UnitTypeEnum
  ) => {
    const currentUnit = units[ingredientName]?.unitType;
    const currentValue = units[ingredientName]?.value || 0;
    const ingredient = createdIngredients.find(
      (i) => i.ingredientName === ingredientName
    );
    // if unit type is changed, prompt conversion
    if (ingredient && currentUnit && currentUnit !== newUnitType) {
      try {
        const { convertedUnitType, convertedPricePerUnit } = convertUnit(
          {
            unitType: ingredient.unitType,
            pricePerUnit: ingredient.pricePerUnit,
          },
          newUnitType
        );

        const newUnits = {
          ...units,
          [ingredientName]: {
            value: currentValue,
            unitType: convertedUnitType,
            convertedPricePerUnit: convertedPricePerUnit,
          },
        };

        setUnits(newUnits);
      } catch (err) {
        alert(err);
        return;
      }
    }
  };

  const totalCost = Object.keys(units).reduce((sum, key) => {
    const ingredient = createdIngredients.find((i) => i.ingredientName === key);
    if (ingredient && checked.includes(ingredient.ingredientName)) {
      return (
        sum +
        (units[key].convertedPricePerUnit || ingredient.pricePerUnit) *
          (units[key].value || 0)
      );
    }
    return sum;
  }, 0);

  const handleSubmit = async (e: any) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const userID = localStorage.getItem("userID");
      const recipeIngredients: IRecipeIngredient[] = checked.map(
        (ingredientName) => {
          const recipeIngredient: IIngredient | undefined =
            createdIngredients.find((i) => i.ingredientName == ingredientName);
          if (!recipeIngredient) {
            throw new Error(`${ingredientName} Not Found`);
          }

          return {
            ingredientID: recipeIngredient._id,
            ingredientName: ingredientName,
            unitType: units[ingredientName].unitType || recipeIngredient.unitType,
            numberUnits: units[ingredientName].value,
            price:
              (units[ingredientName].convertedPricePerUnit ||
                recipeIngredient.pricePerUnit) * units[ingredientName].value,
          };
        }
      );

      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: userID,
          recipeName: recipeName,
          recipeIngredients: recipeIngredients,
          totalCost: totalCost,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create recipe`);
      }
      push("/home");
    } catch (error) {
      alert("Error in creating recipe");
      console.error("Failed to create recipe", error);
    }
  };

  return (
    <div className={styles.ingredientsPage}>
      <div className={styles.ingredientBox}>
        <SearchBar onChange={handleSearch} value={searchInput} />
        {filteredIngredients.length === 0 ? (
          <p>No ingredients found</p>
        ) : (
          <div>
            <TextField
              value={recipeName}
              placeholder="Recipe Name"
              onChange={(e) => setRecipeName(e.target.value)}
              fullWidth
              className={styles.recipeName}
            />
            <CreatedIngredientsList
              ingredientList={filteredIngredients}
              checked={checked}
              handleToggle={handleToggle}
              handleUnitChange={handleUnitChange}
              handleUnitTypeChange={handleUnitTypeChange}
              units={units}
            />
          </div>
        )}

        <div className={styles.totalCost}>
          <h2>Total Cost</h2>
          <h2>{totalCost.toFixed(2)}</h2>
        </div>

        <Button
          variant="contained"
          className={styles.createbutton}
          color="success"
          onClick={handleSubmit}
        >
          Create Recipe
        </Button>
      </div>
    </div>
  );
};

export default withAuth(CreateRecipePage);
