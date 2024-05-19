"use client"
import React, { useState } from "react";
import styles from "./ingredientCard.module.css";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from 'next/link';
import { alignProperty } from "@mui/material/styles/cssUtils";

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
    <div className={styles.ingredientsPage}>
      <div className={styles.ingredientBox}>
        <p className={styles.blackFont}>{ingredientName}</p>
      </div>
      <div className={styles.priceBox}>
        <p className={styles.blackFont}>{price}</p>
      </div>
      <div className={styles.vendorBox}>
        <p className={styles.blackFont}>{vendor}</p>
      </div>
      <div className={styles.totalBox}>
        <p className={styles.blackFont}>{totalAmount}</p>
      </div>
      <div className={styles.unitBox}>
        <p className={styles.blackFont}>{costPerUnit}</p>
      </div>
    </div>
  );
};

export default IngredientCard
