"use client"
import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/navigation";
import styles from './login.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { push } = useRouter();

  const handleLogin = async(e: React.FormEvent) => {
    try{
      e.preventDefault()
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();
      if(response.ok){
        localStorage.setItem("jwtToken", responseData.token);
        localStorage.setItem("userID", responseData.userID);
        push('/home')
      }

      else{
        const errorMessage = responseData.message;
        if(errorMessage == "Failed: Login Incomplete"){
          alert("Incomplete Fields");
        }
        else if(errorMessage == "Failed: Login Failed"){
          alert("Incorrect Email or Password");
        }
        else{
          alert("Login Error");
        }
      }
    }
    catch (error) {
      console.error("Login Error", error);
    }

  }

  return (
    <>
      <div className={styles.loginBackground}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logoImage}
          />
        </Link>

        <div className="flex flex-col items-center">
          <form onSubmit={handleLogin}>
            <div className={styles.loginContainer}>
              <label htmlFor="username" className="text-black">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.loginInput}
              />
            </div>

            <div className={styles.loginContainer}>
              <label htmlFor="password" className="text-black">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginInput}
              />
            </div>
            <div className={styles.loginButtonContainer}>
              <input type="submit" className={styles.loginButton} value="Login"/>
            </div>
          </form>
          <a href="signup" className={styles.signupLink}>New to PricePlate? Click here to create an account</a>
        </div> 

      </div>
    </>
  );
};

export default LoginPage;
