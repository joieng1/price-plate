"use client"
import React, {use, useState} from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import styles from './signup.module.css';
import {IRecipe} from "@/database/recipeSchema"
import Image from 'next/image';

const SignUpPage = () => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { push } = useRouter();

  const handleSignUp = async(e: React.FormEvent) => {
    try{
      e.preventDefault()
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstname, 
          lastName: lastname, 
          email: email, 
          username: username, 
          password: password, 
          recipes: [], 
          ingredients: []})
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("jwtToken", responseData.token);
        push("/home");
      } 
      else if (responseData.message === "Failed: Invalid User") {
        alert("Incomplete Fields");
      } 
      else {
        alert("Login Error");
      }

    }
    catch (error) {
      console.error("Login Error", error);
    }
  }

  return (
    <div className={styles.signUpBackground}>
      
      <Link href="/home" className={styles.logoContainer}>
          <Image src="/logo.png" alt="Logo" height={100} width={100}/>
      </Link>

      <div className="flex flex-col items-center">
        <form onSubmit={handleSignUp}>
        <div className={styles.signUpContainer}>
          <label htmlFor="firstname" className="text-black">First Name</label>
          <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="lastname" className="text-black">Last Name</label>
          <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="email" className="text-black">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="username" className="text-black">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="password" className="text-black">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.signUpInput} />
        </div>
        
        <input type="submit" className={styles.signUpButton} value="Sign Up"/>
        <a href="login" className={styles.linkBlue} data-test="sign-in-link">Already have an account? Click here to log in</a>

        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
