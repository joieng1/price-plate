// use client";
import React, { FunctionComponent } from "react";
import styles from "./ingredientCard.module.css";

interface IngredientAttributes {
  ingredient_name: string;
  price: string;
  cost_per_unit: string;
  vendor: string;
  total_amount: string;
}

const defaultIngredient: IngredientAttributes = {
  ingredient_name: "Ingredient",
  price: "Price",
  cost_per_unit: "cost / unit",
  vendor: "vendor",
  total_amount: "Total Amount",
};

function IngredientCardHelper({ ingredient }: { ingredient: IngredientAttributes }) {
  return (
    <div className={styles.ingredientsCard}>
      <div className={styles.separateBox}>
        <p className={styles.blackFont}>{ingredient.ingredient_name}</p>
      </div>
      <div className={styles.boxContainer}>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.price}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.cost_per_unit}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.vendor}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.total_amount}</p>
        </div>
      </div>
    </div>
  );
}

interface IngredientCardProps {
  ingredient?: IngredientAttributes;
}

const IngredientCard: FunctionComponent<IngredientCardProps> = ({ ingredient = defaultIngredient }) => {
  return <IngredientCardHelper ingredient={ingredient} />;
};

export default IngredientCard;