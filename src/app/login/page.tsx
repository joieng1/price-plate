import React from "react";
import Link from "next/link";
import styles from "./login.module.css";
import Image from "next/image";

const LoginPage = () => {
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
          <div className={styles.loginContainer}>
            <label htmlFor="username" className="text-black">
              Username
            </label>
            <input type="text" id="username" className={styles.loginInput} />
          </div>

          <div className={styles.loginContainer}>
            <label htmlFor="password" className="text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.loginInput}
            />
          </div>
          <a href="signup" className={styles.signupLink}>
            New to PricePlate? Click here to create an account
          </a>
          <Link href="/home">
            <button className={styles.loginButton}>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
