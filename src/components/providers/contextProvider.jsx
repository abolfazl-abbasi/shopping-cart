import React, { useContext, useState } from "react";
import { getGroups, getProducts } from "../../APIs/foodsFakeApi";
import _ from "lodash";

const ProductsContext = React.createContext();
const ProductsContextProvider = React.createContext();
const groupsContext = React.createContext();
const groupsContextProvider = React.createContext();

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState(getProducts());
  const [groups, setGroups] = useState(getGroups());
  return (
    <ProductsContext.Provider value={products}>
      <ProductsContextProvider.Provider value={setProducts}>
        <groupsContext.Provider value={groups}>
          <groupsContextProvider.Provider value={setGroups}>{children}</groupsContextProvider.Provider>
        </groupsContext.Provider>
      </ProductsContextProvider.Provider>
    </ProductsContext.Provider>
  );
};

export const useGroups = () => useContext(groupsContext);
export const useGroupsProvider = () => useContext(groupsContextProvider);
export const useProductsContext = () => useContext(ProductsContext);
export const useProductsContextProvider = () => {
  const setProducts = useContext(ProductsContextProvider);
  const products = useContext(ProductsContext);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");

  const handleIncrement = (pro) => {
    const updateProducts = [...products];
    const index = updateProducts.indexOf(pro);
    updateProducts[index] = { ...pro };
    updateProducts[index].quantity++;
    setProducts(updateProducts);
  };

  const handleDecrement = (pro) => {
    if (pro.quantity <= 1) {
      setProducts(products.filter((p) => p._id !== pro._id));
    }
    if (pro.quantity > 1) {
      const updateProducts = [...products];
      const index = updateProducts.indexOf(pro);
      updateProducts[index] = { ...pro };
      updateProducts[index].quantity--;
      setProducts(updateProducts);
    }
  };

  const handleLike = (pro) => {
    const updateProducts = [...products];
    const index = updateProducts.indexOf(pro);
    updateProducts[index] = { ...pro };
    updateProducts[index].liked = !updateProducts[index].liked;
    setProducts(updateProducts);
  };

  const handleFilter = (e) => {
    const mainProducts = getProducts().slice();
    if (e === "") {
      setProducts(mainProducts);
    }
    if (e !== "") {
      setProducts(mainProducts.filter((pro) => pro.group._id.indexOf(e) >= 0));
      setFilter(e);
    }
  };

  const handleSorted = (e) => {
    if (e === "lowed") setProducts(_.orderBy(products, ["price"], ["asc"]));

    if (e === "highted") setProducts(_.orderBy(products, ["price"], ["desc"]));

    return setSort(e);
  };

  const handleFavorites = () => {
    if (products.some((e) => e.liked === true)) setProducts(_.filter(products, ["liked", true]));
  };

  const handleSearch = (e) => {
    const mainProducts = getProducts().slice();
    if (e === "") {
      setProducts(mainProducts);
    }
    if (e !== "") {
      setProducts(mainProducts.filter((p) => (p.ingredients + p.title).includes(e.target.value)));
    }
  };

  return {
    handleIncrement,
    handleDecrement,
    handleLike,
    handleFilter,
    handleSorted,
    handleFavorites,
    handleSearch,
  };
};

export default ContextProvider;
