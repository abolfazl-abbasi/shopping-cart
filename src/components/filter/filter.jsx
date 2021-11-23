import { useGroups, useProductsContext, useProductsContextProvider } from '../providers/contextProvider';
import { useState } from 'react';
import styles from './filter.jsx-style/filter.module.css';
import { getProducts } from '../../APIs/foodsFakeApi';

const Filter = () => {
  // const products = useProductsContext()
  const {handleFilter , handleSortedPrice} = useProductsContextProvider()
  const groups = useGroups()

  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('')
  
  const handleSortedPricePro = (e) => {
    handleSortedPrice(e);
    setSort(e);
  }

  const handleFilterPro = (e) => {
    handleFilter(e);
    setFilter(e);
  }

  return (
    <>
      <div className={`${styles.filter}`}>
        <select key='select1' className={`${styles.select} ${styles.selectGroup}`} onChange={(e) => handleFilterPro(e.target.value)}>
          <option value="" key="" disabled selected>دسته بندی</option>
          {groups.map((group) => 
            <option value={group._id} key={group._id}>{group.name}</option>
          )}
        </select>
        <select key='select2' className={`${styles.select} ${styles.selectGroup}`} onChange={(e) => handleSortedPricePro(e.target.value)}>
          <option value="" key="" disabled selected>مرتب سازی</option>
          <option value="highted" key="highted">بالاترین قیمت</option>
          <option value="lowed" key="lowed">کمترین قیمت</option>
        </select>
      </div>
    </>
  );
}
 
export default Filter;