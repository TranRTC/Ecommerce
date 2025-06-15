import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ManufacturerPage from "./pages/ManufacturerPage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import OrderItemPage from "./pages/OrderItemPage";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/manufacturers">Manufacturers</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/customers">Customers</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/orderitems">OrderItems</Link></li>
        </ul>
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
