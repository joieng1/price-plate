import React from 'react';
import Link from 'next/link';
import styles from './signup.module.css';
import Image from 'next/image'

const SignUpPage = () => {
  return (
    <div className={styles.signUpBackground}>

      <Link href="/home">
          <Image src="/logo.png" alt="Logo" height={100} width={100} />
      </Link>
      
      <div className="flex flex-col items-center mt-5">
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
