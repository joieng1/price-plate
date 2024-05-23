import React from 'react';
import Link from 'next/link';
import styles from './welcome.module.css';

const WelcomePage = () => {
  return (
    <>
      <div className={styles.welcomeBackground}>
  <div className={styles.logoContainer}>
    <img src="/logo.png" alt="Logo" className={styles.logoImage} />
  </div>
  <div className={styles.parentContainer}>
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center mb-4">
        <div className={styles.carouselContainer}>
          <label htmlFor="username" className="text-black">Welcome to 
PricePlate, 
your everyday
food 
budgeting tool!</label>
        </div>
        <div className={styles.carouselContainer}>
          <label htmlFor="password" className="text-black">Struggling to
use spreadsheets
to calculate the
amount you
spend on food?</label>
        </div>
        <div className={styles.carouselContainer}>
          <label htmlFor="password" className="text-black">We make
tracking the food 
you use in your
cooking as easy 
as the push of a 
button.</label>
        </div>
        <div className={styles.carouselContainer}>
          <label htmlFor="password" className="text-black">All you need is
the prices and
quantities of your
food - we’ll
handle the
number crunching.</label>
        </div>
        <div className={styles.carouselContainer}>
          <label htmlFor="password" className="text-black">Press “Get
Started” to create
an account!</label>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/signup">
          <button className={styles.startButton}>Get Started</button>
        </Link>
        <a href="login" className={`${styles.signupLink} mt-4`}>
          Already have an account? Click here to sign in
        </a>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default WelcomePage;