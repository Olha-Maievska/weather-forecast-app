import styles from "@/styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer
      className={styles.footer}
      role="contentinfo"
      tabIndex={0}
    >
      <p className={styles.footer__text}>
        &copy; 2025 Weather forecast App. Developed by{" "}
        <a
          href="https://github.com/Olha-Maievska"
          target="_blank"
          aria-label="GitHub link developed by Olha Maievska"
          rel="noreferrer"
        >
          Olha Maievska
        </a>
      </p>
    </footer>
  );
};

export default Footer;
