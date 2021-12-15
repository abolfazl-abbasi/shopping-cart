import React, { useContext, useState, useEffect } from "react";
import { getGroups, getProducts } from "../../APIs/foodsFakeApi";
import _ from "lodash";
import axios from "axios";

const ProductsContext = React.createContext();
const ProductsContextProvider = React.createContext();
const groupsContext = React.createContext();
const groupsContextProvider = React.createContext();

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
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
  // console.log(sort);

  const handleFilter = async (e) => {
    if (e === "") {
      const { data } = await axios.get("/cartItems");
      await setProducts(data);
    }
    if (e !== "") {
      const { data } = await axios.get("/cartItems");
      setProducts(data.filter((pro) => pro.group.id.indexOf(e) >= 0));
      setFilter(e);
    }
  };

  const handleLoad = async () => {
    if (products === []) console.log("abol");
    return <h5>Loading ...</h5>;
  };

  const handleSorted = async (e) => {
    const { data: desc } = await axios.get("/cartItems?_sort=price&_order=desc");
    const { data: asc } = await axios.get("/cartItems?_sort=price&_order=asc");
    setSort(e);
    if (e === "lowed") await setProducts(asc);
    if (e === "highted") await setProducts(desc);
  };

  useEffect(() => {
    async function getPros() {
      const { data } = await axios.get("/cartItems");
      await setProducts(data);
      await handleSorted(sort);
    }
    return getPros();
  }, []);

  const handleIncrement = async (pro) => {
    await axios.put(`/cartItems/${pro.id}`, { ...pro, quantity: ++pro.quantity });
    const { data } = await axios.get("/cartItems");
    await setProducts(data);
    handleSorted(sort);

    // OK!
  };

  const handleDecrement = async (pro) => {
    if (pro.quantity <= 1) {
      await axios.delete(`/cartItems/${pro.id}`);
      const { data } = await axios.get("/cartItems");
      await setProducts(data);
      handleSorted(sort);
    }
    if (pro.quantity > 1) {
      await axios.put(`/cartItems/${pro.id}`, { ...pro, quantity: --pro.quantity });
      const { data } = await axios.get("/cartItems");
      await setProducts(data);
      handleSorted(sort);
    }
    // OK!
  };

  const handleLike = async (pro) => {
    await axios.put(`/cartItems/${pro.id}`, { ...pro, liked: !pro.liked });
    const { data } = await axios.get("/cartItems");
    await setProducts(data);
    handleSorted(sort);

    // OK!
  };

  const handleFavorites = async () => {
    if (products.some((e) => e.liked === true)) {
      await setProducts(_.filter(products, ["liked", true]));
      handleSorted(sort);
    }
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
    handleLoad,
  };
};

export default ContextProvider;
