import styles from "@/styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>
        &copy; 2025 Weather forecast App. Developed by{" "}
        <a href="https://github.com/Olha-Maievska" target="_blank">
          Olha Maievska
        </a>
      </p>
    </footer>
  );
};

export default Footer;
