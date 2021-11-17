import React from 'react';
import ContextProvider from '../providers/contextProvider';
import Products from '../foods/ProductsList.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import './App.jsx-style/app.module.css';

const App = () => {
  return (
    <ContextProvider>
      <Navbar/>
      <Products/>
    </ContextProvider>
  );
}

export default App;