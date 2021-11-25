import React, { useState } from "react";
import { useProductsContext, useProductsContextProvider } from "../providers/contextProvider";
import styles from "./Navbar.jsx-style/Navbar.module.css";

const Navbar = () => {
  const products = useProductsContext();
  const { handleSearch } = useProductsContextProvider();
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    handleSearch(e);
  };
  return (
    <>
      <div className={`${styles.navbar}`}>
        <div className={`${styles.nav}`}>
          <div className={`${styles.countBox}`}>
            <p className={`${styles.productsCountParagraph}`}> تعداد در سبد خرید : </p>
            <span className={`${styles.productsCount}`}>{products.filter((p) => p.quantity > 0).length}</span>
          </div>
          <div className={`${styles.brandBox}`}>
            <h2 className={`${styles.brandName}`}>صاحب فود</h2>
          </div>
          <div className={`${styles.searchBox}`}>
            <input
              id="input"
              list="inputList"
              placeholder="جستجو در صاحب فود"
              type="search"
              className={`${styles.searchInput}`}
              value={value}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
