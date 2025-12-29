import { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config.js";
import styles from "../pages/CheckOut.module.css";

function CheckOut() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cart, totalPrice, clearCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Por favor ingresá tu nombre y apellido.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Ingresá un correo válido.");
      return;
    }

    if (!/^\d{7,15}$/.test(phone)) {
      alert("Ingresá un número de teléfono válido.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const order = {
      buyer: {
        name,
        email,
        phone,
      },
      items: cart.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      })),
      total: totalPrice(),
      date: Timestamp.fromDate(new Date()),
    };

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "orders"), order);

      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al generar la orden:", error);
      alert("Hubo un error al generar la orden. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es:</p>
        <strong className={styles.orderId}>{orderId}</strong>
        <p>Guardalo para futuras consultas.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Finalizar compra</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nombre y apellido"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Teléfono"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
}

export default CheckOut;
