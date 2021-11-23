import React from 'react';
import { useProductsContext } from '../providers/contextProvider';
import styles from './Navbar.jsx-style/Navbar.module.css';

const Navbar = () => {
  const products = useProductsContext();
  return (
    <>
      <div className={`${styles.navbar}`}>
        <div className={`${styles.nav}`}>
          <div className={`${styles.countBox}`}>
            <p className={`${styles.productsCountParagraph}`}> تعداد در سبد خرید : </p>
            <span className={`${styles.productsCount}`}>{products.filter(p => (p.quantity > 0)).length}</span>
          </div>
          <div className={`${styles.brandBox}`}>
            <h2 className={`${styles.brandName}`}>صاحب فود</h2>
          </div>
          <div className={`${styles.searchBox}`}>
            <input className={`${styles.searchInput}`} placeholder='جستجو در صاحب فود' type="search"/>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Navbar;