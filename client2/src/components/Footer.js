import React from "react";
import styles from "./styles/Footer.module.css";
import linkedinLogo from "../assets/linkedin.png"
import githubLogo from "../assets/github.png"
const linkedinURL = "https://www.linkedin.com/in/dbriceno10/";
const githubURL = "https://github.com/dbriceno10";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerDiv}>
        <span>
          <a className={styles.footerDivA} href={linkedinURL} target="_blank">
            <img
              className={styles.footerDivAImg}
              src={linkedinLogo}
              alt="linkedin-logo"
              title="linkedin-logo"
            />
          </a>
        </span>
        <span>
          <a className={styles.footerDivA} href={githubURL} target="_blank">
            <img
              className={styles.footerDivAImg}
              src={githubLogo}
              alt="github-logo"
              title="github-logo"
            />
          </a>
        </span>
      </div>
    </footer>
  );
}
