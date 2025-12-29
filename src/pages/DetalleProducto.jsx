import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "./DetalleProducto.module.css";
import { useCart } from "../context/CartContext";

const DetalleProductos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart(); 

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "items", id);

    getDoc(ref)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProducto({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProducto(null);
        }
      })
      .catch((error) => {
        console.error("Error al obtener producto:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{producto.nombre}</h1>

      {producto.img && (
        <img
          className={styles.image}
          src={producto.img}
          alt={producto.nombre}
        />
      )}

      <p className={styles.price}>
        <strong>Precio:</strong> ${producto.precio}
      </p>

      <p className={styles.description}>
        <strong>Descripción:</strong> {producto.detalle}
      </p>

      <button
        onClick={() => addItem(producto, 1)}
        className={styles.addBtn}
      >
        Agregar al carrito
      </button>

      <button
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        Volver
      </button>
    </div>
  );
};

export default DetalleProductos;
