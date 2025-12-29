import styles from "./Banners.module.css";
import banner1 from "../../img/Banner.jpg";
import banner2 from "../../img/BANNER CUADERNOS A4.png";
import banner3 from "../../img/BANNER COMBO BASIC.jpg";
import banner4 from "../../img/BANNER COMBO ARTE.jpg";
const Banners = () => {
  return (
    <>
      <div className={styles.contenedor}>
        <img className={styles.img} src={banner1} alt="Banner_bienvenida" />
        <img className={styles.img} src={banner2} alt="Banner_bienvenida" />
        <img className={styles.img} src={banner3} alt="Banner_bienvenida" />
        <img className={styles.img} src={banner4} alt="Banner_bienvenida" />
      </div>
    </>
  );
};
export default Banners;