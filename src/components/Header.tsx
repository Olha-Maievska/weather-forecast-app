import Search from "./Search";
import styles from "../styles/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__content}`}>
        <h2 className={styles.logo}>
          Weather App
        </h2>
        <Search />
      </div>
    </header>
  );
};

export default Header;
