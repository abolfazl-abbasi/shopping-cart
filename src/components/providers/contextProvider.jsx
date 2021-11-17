import React , { useContext , useState } from 'react';
import { getProducts } from '../../APIs/foodsFakeApi';

const ProductsContext = React.createContext()
const ProductsContextProvider = React.createContext()

const ContextProvider = ({children}) => {
  const [products, setProducts] = useState(getProducts())
  return (
    <ProductsContext.Provider value={products}>
      <ProductsContextProvider.Provider value={setProducts}>
        {children}
      </ProductsContextProvider.Provider>
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext)
export const useProductsContextProvider = () => {
  const setProducts = useContext(ProductsContextProvider)
  const products = useContext(ProductsContext)

  const handleIncrement = (pro) => {
    const updateProducts = [...products];
    const index = updateProducts.indexOf(pro);
    updateProducts[index] = {...pro}
    updateProducts[index].quantity++;
    setProducts(updateProducts);
  }

  const handleDecrement = (pro) => {
    if(pro.quantity <= 1){
      setProducts(products.filter(p => p._id !== pro._id))
    }
    if(pro.quantity > 1){
      const updateProducts = [...products];
      const index = updateProducts.indexOf(pro);
      updateProducts[index] = {...pro}
      updateProducts[index].quantity--;
      setProducts(updateProducts);
    }
  }

  const handleLike = (pro) => {
    const updateProducts = [...products];
    const index = updateProducts.indexOf(pro);
    updateProducts[index] = {...pro};
    updateProducts[index].liked = !updateProducts[index].liked;
    // console.log(!updateProducts[index].liked);
    setProducts(updateProducts)
  }

  return {handleIncrement , handleDecrement , handleLike}
}
 
export default ContextProvider;