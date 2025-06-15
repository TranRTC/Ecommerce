import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ManufacturerPage from "./pages/ManufacturerPage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import OrderItemPage from "./pages/OrderItemPage";
import "./App.css";

function Home() {
  return (
    <div>
      <h1 className="home-title">E-Commerce Management Application</h1>
      <nav className="home-nav">
        <Link to="/manufacturers" className="home-link">Manufacturers</Link>
        <Link to="/products" className="home-link">Products</Link>
        <Link to="/customers" className="home-link">Customers</Link>
        <Link to="/orders" className="home-link">Orders</Link>
        <Link to="/orderitems" className="home-link">OrderItems</Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manufacturers/*" element={<ManufacturerPage />} />
        <Route path="/products/*" element={<ProductPage />} />
        <Route path="/customers/*" element={<CustomerPage />} />
        <Route path="/orders/*" element={<OrderPage />} />
        <Route path="/orderitems/*" element={<OrderItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
