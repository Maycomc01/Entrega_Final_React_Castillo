
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Libreria from "./pages/Libreria";
import Marroquineria from "./pages/Marroquineria";
import Oficina from "./pages/Oficina";
import Promociones from "./pages/Promociones";
import DetalleProductos from "./pages/DetalleProducto";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/libreria" element={<Libreria />} />
        <Route path="/marroquineria" element={<Marroquineria />} />
        <Route path="/oficina" element={<Oficina />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/detalle/:id" element={<DetalleProductos />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
