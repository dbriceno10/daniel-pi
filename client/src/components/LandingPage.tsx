import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/LandingPage.module.scss";
import wikiDexImg from "../assets/Logo_WikiDex_App.png";

const LandingPage = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className={styles.background}>
      <div className={styles.grid}>
        <div>
          <img src={wikiDexImg} alt="wikidex" className={styles.imgwiki} />
        </div>
        <h1 className={styles.title}>WikiDex</h1>
      </div>
      <div className={styles.btncontainer}>
        <button onClick={() => navigate("/home")} className={styles.btn}>
          Home
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
