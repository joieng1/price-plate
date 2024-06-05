"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "../ingredientCard.module.css";
import withAuth from "@/middleware/withAuth";

interface IngredientAttributes {
  ingredientName: string;
  price: string;
  pricePerUnit: string;
  vendor: string;
  brand: string;
  unitType: string;
}

const defaultIngredient: IngredientAttributes = {
  ingredientName: "Ingredient",
  price: "Price",
  pricePerUnit: "cost / unit",
  vendor: "vendor",
  brand: "brand",
  unitType: "unit",
};

interface IngredientCardProps {
  params: {
    id: string;
  };
}

function IngredientCardHelper({ ingredient }: { ingredient: IngredientAttributes }) {
  return (
    <div className={styles.ingredientsCard}>
      <div className={styles.separateBox}>
        <p className={styles.blackFont}>{ingredient.ingredientName}</p>
      </div>
      <div className={styles.boxContainer}>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.price}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.pricePerUnit}/{ingredient.unitType}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.vendor}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.blackFont}>{ingredient.brand}</p>
        </div>
      </div>
    </div>
  );
}

const IngredientCard: FunctionComponent<IngredientCardProps> = ({ params }) => {
  const [ingredient, setIngredient] = useState<IngredientAttributes>(defaultIngredient);
  
  useEffect(() => {
    const id = params.id;
    const fetchIngredient = async () => {
      try{

        const token = localStorage.getItem('jwtToken');
        const userID = localStorage.getItem('userID');

        const response = await fetch(`/api/ingredient/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if(!response.ok){
          throw new Error('Failed to fetch ingredients');
        }

        const data: IngredientAttributes = await response.json();
        setIngredient(data);
      }
      catch(error){
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredient();
  }, [params.id]);

  return <IngredientCardHelper ingredient={ingredient} />;
};

export default withAuth(IngredientCard);