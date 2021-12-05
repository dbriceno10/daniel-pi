import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LandingPage.module.css";
import wikiDexImg from "../assets/Logo_WikiDex_App.png";
export default function LadingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.grid}>
        <div>
          <img src={wikiDexImg} alt="wikidex" className={styles.imgwiki} />
        </div>
        <h1 className={styles.title}>WikiDex</h1>
      </div>
      <Link to="/home">
        <button className={styles.btn}>Home</button>
      </Link>
    </div>
  );
}
