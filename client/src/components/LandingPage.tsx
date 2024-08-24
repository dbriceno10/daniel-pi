import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import wikiDexImg from "../assets/Logo_WikiDex_App.png";

import styles from "./styles/LandingPage.module.scss";

const LandingPage = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box className={styles.background}>
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
    </Box>
  );
};

export default LandingPage;
