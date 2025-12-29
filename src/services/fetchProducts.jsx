import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config.js";
import styles from "./FetchProduct.module.css";
import { useCart } from "../context/CartContext";

const formatPrice = (num) => {
  const number = Number(num);
  if (isNaN(number)) return "$ —";
  return "$ " + number.toLocaleString("es-AR");
};

function FetchProduct({ categoria }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addItem } = useCart(); 
  useEffect(() => {
    setLoading(true);

    const productosRef = collection(db, "items");
    const q = query(productosRef, where("categoria", "==", categoria));

    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [categoria]);

  if (loading) return <h2>Cargando productos…</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (productos.length === 0)
    return <h2>No hay productos en esta categoría.</h2>;

  const handleAddToCart = (producto) => {
    addItem(
      {
        id: producto.id,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        img: producto.img || "",
      },
      1
    );
  };

  return (
    <div className={styles.card_grid}>
      {productos.map((producto) => (
        <div className={styles.product_card} key={producto.id}>
          {producto.img && (
            <img
              className={styles.product_img}
              src={producto.img}
              alt={producto.nombre}
            />
          )}

          <h3 className={styles.product_title}>{producto.nombre}</h3>

          <p className={styles.product_price}>
            {formatPrice(producto.precio)}
          </p>

          {producto.stock <= 5 && (
            <span className={styles.stock_bajo}>STOCK BAJO</span>
          )}

          <div className={styles.btn_group}>
            <button
              className={styles.btn_cart}
              onClick={() => handleAddToCart(producto)}
            >
              Comprar ahora
            </button>

            <Link
              to={`/Detalle/${producto.id}`}
              className={styles.btn_detail}
            >
              Ver detalle
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FetchProduct;
