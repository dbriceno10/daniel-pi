import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../assets/who_is.png";
import styles from "./styles/NotFoundPage.module.css";
import wikedexImg from "../assets/Logo_WikiDex_App.png";
// import Footer from "./Footer";

export default function NotFoundPage() {
  return (
    <div className={styles.detailscontainer}>
      <Link className={styles.link} to="/">
        <div className={styles.wikiimg}>
          <div>
            <img src={wikedexImg} alt="not found" />
          </div>
          <p>Volver</p>
        </div>
      </Link>
      <div>
        <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
          <img
            src={defaultImg}
            alt="Pokemon not Found"
            width="300px"
            height="300px"
          />
          <h2> Page Not Found</h2>
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
