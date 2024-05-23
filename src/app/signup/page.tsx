import React from 'react';
import Link from 'next/link';
import styles from './signup.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.signUpBackground}>

      <div className="flex flex-col items-center">
        <div className={styles.signUpContainer}>
          <label htmlFor="firstname" className="text-black">First Name</label>
          <input type="text" id="firstname" className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="lastname" className="text-black">Last Name</label>
          <input type="text" id="lastname" className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="email" className="text-black">Email</label>
          <input type="text" id="email" className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="username" className="text-black">Username</label>
          <input type="text" id="username" className={styles.signUpInput} />
        </div>

        <div className={styles.signUpContainer}>
          <label htmlFor="password" className="text-black">Password</label>
          <input type="password" id="password" className={styles.signUpInput} />
        </div>

        <a href="login" className={styles.linkBlue}>Already have an account? Click here to log in</a>
        <Link href="/home">
          <button className={styles.signUpButton}>Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
