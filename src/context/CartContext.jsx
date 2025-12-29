import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  
  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  
  const addItem = (product, quantity = 1) => {
    if (!product || !product.id) return;

    setCart((prevCart) => {
      const itemExists = prevCart.find(
        (item) => item.id === product.id
      );

      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cantidad: item.cantidad + quantity,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cantidad: quantity,
        },
      ];
    });
  };

  
  const removeItem = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

 
  const decreaseItem = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  
  const clearCart = () => {
    setCart([]);
  };

  
  const totalItems = () => {
    return cart.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
  };

  
  const totalPrice = () => {
    return cart.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        decreaseItem,
        clearCart,
        totalItems,
        totalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
