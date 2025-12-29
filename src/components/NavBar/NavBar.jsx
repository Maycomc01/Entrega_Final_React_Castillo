import styles from "./NavBar.module.css";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <header className={styles.presentacion}>
        <img className={styles.img} src={logo} alt="Logo del negocio" />
        <h1 className={styles.nombre}>Juanita de las Nieves</h1>
      </header>

      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Inicio
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/libreria"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Librería
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/marroquineria"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Marroquinería
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/oficina"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Oficina
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/promociones"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Promociones
          </NavLink>
        </li>
      </ul>

      <CartWidget />
    </nav>
  );
};

export default NavBar;
