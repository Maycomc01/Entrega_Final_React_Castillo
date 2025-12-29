import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart() {
  const {
    cart,
    addItem,
    decreaseItem,
    removeItem,
    totalPrice,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <h2>El carrito está vacío</h2>
        <Link to="/">
          <button className={styles.clearBtn}>Volver al inicio</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mi Carrito</h2>

      <div className={styles.list}>
        {cart.map((item) => (
          <div key={item.id} className={styles.item}>
            {item.imagen && (
              <img
                src={item.imagen}
                alt={item.nombre}
                className={styles.thumb}
              />
            )}

            <div className={styles.info}>
              <h3 className={styles.name}>{item.nombre}</h3>

              <p className={styles.price}>
                Precio: ${item.precio.toLocaleString("es-AR")}
              </p>

              <div className={styles.controls}>
                <button
                  className={styles.smallBtn}
                  onClick={() => decreaseItem(item.id)}
                >
                  -
                </button>

                <span className={styles.qty}>{item.cantidad}</span>

                <button
                  className={styles.smallBtn}
                  onClick={() => addItem(item, 1)}
                >
                  +
                </button>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h3>Total: ${totalPrice().toLocaleString("es-AR")}</h3>

        <div className={styles.actions}>
          <button className={styles.clearBtn} onClick={clearCart}>
            Vaciar carrito
          </button>

          <Link to="/checkout">
            <button className={styles.checkoutBtn}>
              Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
