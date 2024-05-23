"use client";
import React from "react";
import styles from "./ingredientCard.module.css";

interface IngredientCardProps {
  ingredientName: string;
  price: string;
  costPerUnit: string;
  vendor: string;
  totalAmount: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredientName = "Ingredient",
  price = "Price",
  costPerUnit = "Cost / Unit",
  vendor = "Vendor",
  totalAmount = "Total"
}) => {
  return (
    <div className={styles.ingredientsCard}>
      <div className={styles.separateBox}>
        <p className={styles.blackFont}>{ingredientName}</p>
      </div>
      <div className={styles.boxContainer}>
        <div className={styles.box}>
          <p className={styles.blackFont}>{price}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{vendor}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{totalAmount}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{costPerUnit}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
