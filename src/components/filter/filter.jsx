import { useGroups, useProductsContextProvider } from "../providers/contextProvider";
import styles from "./filter.jsx-style/filter.module.css";
import { BiHeart } from "react-icons/bi";
import axios from "axios";

const Filter = () => {
  const { handleFilter, handleSorted, handleFavorites } = useProductsContextProvider();
  const groups = useGroups();
  const handleData = async () => {
    const { data } = await axios.get("/cartItems");
    return data;
  };

  return (
    <>
      <div className={`${styles.filter}`}>
        <div className={`${styles.ordered}`}>
          <select
            key="select1"
            className={`${styles.select} ${styles.selectGroup}`}
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue=""
          >
            <option value="" key="all" disabled selected>
              دسته بندی
            </option>
            {groups.map((group) => (
              <option value={group.id} key={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <select
            key="select2"
            className={`${styles.select} ${styles.selectGroup}`}
            onChange={(e) => handleSorted(e.target.value)}
            defaultValue=""
          >
            <option value="" key="all" disabled selected>
              مرتب سازی
            </option>
            <option value="highted" key="highted">
              بالاترین قیمت
            </option>
            <option value="lowed" key="lowed">
              کمترین قیمت
            </option>
          </select>
        </div>
        <div className={`${styles.favAllBtn}`}>
          <div className={`${styles.all}`}>
            <button value="" onClick={(e) => handleFilter(e.target.value)} className={`${styles.allBtn}`}>
              All
            </button>
          </div>
          <div className={`${styles.favorite}`}>
            <button onClick={handleFavorites} className={`${styles.favoriteBtn}`}>
              <BiHeart className={`${styles.heart}`} />
              Favorites
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
