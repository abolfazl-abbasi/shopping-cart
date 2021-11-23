import React from 'react';
import ContextProvider from '../providers/contextProvider';
import Products from '../foods/ProductsList.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import './App.jsx-style/app.module.css';
import Filter from '../filter/filter';

const App = () => {
  return (
    <ContextProvider>
      <Navbar/>
      <Filter/>
      <Products/>
    </ContextProvider>
  );
}

export default App;