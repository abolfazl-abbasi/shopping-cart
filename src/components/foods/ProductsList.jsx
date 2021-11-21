import React from 'react';
import { useProductsContext, useProductsContextProvider } from '../providers/contextProvider.jsx';
import styles from './ProductsList.jsx-style/ProductsList.module.css';

const Products = () => {
  const products = useProductsContext();
  const {handleIncrement , handleDecrement , handleLike} = useProductsContextProvider()
  return (
    <div className={`${styles.products}`}>
      {products.map(product => 
        <div key={product._id} className={`${styles.product}`}>
          <div className={`${styles.productsContent}`}>
            <img loading='lazy' className={`${styles.productImage}`} width='50px' src={product.image} alt={product.title}/>
            <div className={`${styles.productTitles}`}>
              <p className={`${styles.productTitle}`}>{product.title}</p>
              <p className={`${styles.productIngredients}`}>{product.ingredients}</p>
              <p className={`${styles.productPrice}`}>{product.price} تومان</p>
            </div>
          </div>
          <div className={`${styles.handlers}`}>
            <div className={`${styles.like}`}>
              {/* <p><i className="bi bi-trash"></i></p> */}
              <p><i onClick={() => handleLike(product)} className={product.liked === true ? "bi bi-heart-fill" : "bi bi-heart"}></i></p>
            </div>
            <div className={`${styles.crement}`}>
              <button onClick={() => handleDecrement(product)} className={`${styles.btn} ${product.quantity <= 1 ? styles.delete : styles.decrement}`}><i className="bi bi-trash"></i><span>-</span></button>
              <p className={`${styles.quantity}`}>{product.quantity}</p>
              <button onClick={() => handleIncrement(product)} className={`${styles.btn}`}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Products;