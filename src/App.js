import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import CustomerPage from './components/Customer/CustomerPage';
import SupplierPage from './components/Supplier/SupplierPage';
import HomePage from './components/Home/HomePage';
import NavBar from './components/Home/NavBar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
    <Router>
        <NavBar />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/customers' element={<CustomerPage />} />
            <Route path='/suppliers' element={<SupplierPage />} />
        </Routes>
    </Router>
</React.Fragment>
  );
}

export default App;