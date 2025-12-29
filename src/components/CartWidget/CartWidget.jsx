import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./CartWidget.module.css";

function CartWidget() {
  const { totalItems } = useCart();

  const itemsCount = totalItems();

  return (
    <Link to="/cart" className={styles.cart}>
      <span className={styles.icon}>🛒</span>

      {itemsCount > 0 && (
        <span className={styles.badge}>{itemsCount}</span>
      )}
    </Link>
  );
}

export default CartWidget;
