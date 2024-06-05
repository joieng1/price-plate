"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "../ingredientCard.module.css";
import withAuth from "@/middleware/withAuth";
import { Button } from "@/components/ui/button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IngredientAttributes {
  ingredientName: string;
  price: number;
  pricePerUnit: number;
  vendor: string;
  brand: string;
  numberUnits: number;
  unitType: UnitTypeEnum;
}

enum UnitTypeEnum {
  KG = "kg",
  LB = "lb",
  OZ = "oz",
  G = "g",
}
const defaultIngredient: IngredientAttributes = {
  ingredientName: "Ingredient",
  price: 0,
  pricePerUnit: 0,
  vendor: "vendor",
  brand: "brand",
  numberUnits: 0,
  unitType: UnitTypeEnum.G,
};

interface IngredientCardProps {
  params: {
    id: string;
  };
}

const IngredientCard: FunctionComponent<IngredientCardProps> = ({ params }) => {
  const [ingredient, setIngredient] =
    useState<IngredientAttributes>(defaultIngredient);
  const [formValues, setFormValues] =
    useState<IngredientAttributes>(defaultIngredient);
  const [editMode, setEditMode] = useState<Boolean>(false);

  useEffect(() => {
    const id = params.id;
    const fetchIngredient = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await fetch(`/api/ingredient/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ingredients");
        }

        const data: IngredientAttributes = await response.json();
        setIngredient(data);
        setFormValues(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredient();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUnitChange = (unit: UnitTypeEnum) => {
    setFormValues({ ...formValues, unitType: unit });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    // update form
    e.preventDefault();

    try {
      const pricePerUnit = formValues.price / formValues.numberUnits;

      const editIngredient = {
        ...ingredient,
        ingredientName: formValues.ingredientName,
        brand: formValues.brand,
        vendor: formValues.vendor,
        unitType: formValues.unitType,
        numberUnits: formValues.numberUnits,
        price: formValues.price,
        pricePerUnit,
      };
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`/api/ingredient/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editIngredient),
      });

      if (!response.ok) {
        throw new Error("Failed to update ingredient");
      }

      const updatedIngredient = await response.json();
      setIngredient(updatedIngredient);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };
  return (
    <div>
      <div className={styles.ingredientsCard}>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Button onClick={() => setEditMode(!editMode)}>Cancel</Button>
            <div className={styles.separateBox}>
              <h1 className={styles.formLabel}>Ingredient Name</h1>
              <input
                className={styles.blackFontEdit}
                type="text"
                name="ingredientName"
                value={formValues.ingredientName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                <h1 className={styles.formLabel}>Price</h1>
                <input
                  className={styles.blackFontEdit}
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.box}>
                <h1 className={styles.formLabel}>Number of Units</h1>
                <OutlinedInput
                  type="number"
                  className={styles.blackFontEdit}
                  value={Number(formValues.numberUnits)}
                  onChange={handleInputChange}
                  name="numberUnits"
                  endAdornment={
                    <InputAdornment position="end">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-[10rem]">
                          <div className="border-[1.5px] border-gray-300 rounded-md p-1 cursor-pointer">
                            {formValues.unitType || "Select Unit Type"}
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          {Object.values(UnitTypeEnum).map((unit) => (
                            <DropdownMenuItem
                              key={unit}
                              className="text-[1.2rem]"
                              onSelect={() => handleUnitChange(unit)}
                            >
                              {unit}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </InputAdornment>
                  }
                />
              </div>
              <div className={styles.box}>
                <h1 className={styles.formLabel}>Vendor</h1>
                <input
                  className={styles.blackFontEdit}
                  type="text"
                  name="vendor"
                  value={formValues.vendor}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.box}>
                <h1 className={styles.formLabel}>Brand</h1>
                <input
                  className={styles.blackFontEdit}
                  type="text"
                  name="brand"
                  value={formValues.brand}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button onClick={handleSubmit}>Submit Changes</Button>
          </form>
        ) : (
          <>
            <Button className="w-20" onClick={() => setEditMode(!editMode)}>
              Edit
            </Button>
            <div className={styles.ingredientsCard}>
              <div className={styles.separateBox}>
                <h1 className={styles.formLabel}>Ingredient Name</h1>
                <p className={styles.blackFont}>{ingredient.ingredientName}</p>
              </div>
              <div className={styles.boxContainer}>
                <div className={styles.box}>
                  <h1 className={styles.formLabel}>Ingredient Price</h1>
                  <p className={styles.blackFont}>{ingredient.price}</p>
                </div>
                <div className={styles.box}>
                  <p className={styles.blackFont}>
                    <h1 className={styles.formLabel}>Price per Unit</h1>
                    {ingredient.pricePerUnit}/{ingredient.unitType}
                  </p>
                </div>
                <div className={styles.box}>
                  <h1 className={styles.formLabel}>Vendor</h1>
                  <p className={styles.blackFont}>{ingredient.vendor}</p>
                </div>
                <div className={styles.box}>
                  <h1 className={styles.formLabel}>Ingredient Brand</h1>
                  <p className={styles.blackFont}>{ingredient.brand}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withAuth(IngredientCard);
