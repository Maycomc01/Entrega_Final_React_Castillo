import FetchProduct from "../services/fetchProducts";
import styles from "./pages.module.css";

const Marroquineria = () => {
  return (
    <>
      <h1 className={styles.title}>Productos de Marroquinería</h1>
      <FetchProduct categoria="marroquineria" />
    </>
  );
};

export default Marroquineria;