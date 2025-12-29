import FetchProduct from "../services/fetchProducts";
import styles from "./pages.module.css";
const Oficina = () => {
  return (
    <>
      <h1 className={styles.title}>Productos de Oficina</h1>
      <FetchProduct categoria="oficina" />
    </>
  );
};

export default Oficina;