import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./PageStyle.css";
import ProductList from "../components/Product/ProductList";
import ProductAdd from "../components/Product/ProductAdd";
import ProductDetail from "../components/Product/ProductDetail";

function ProductPage() {
  return (
    <div>
      <h2 className="hub-title">Products</h2>
      <nav className="hub-nav">
        <Link to="/" className="home-link">Home</Link> |{" "}
        <Link to="/products/list" className="home-link">List</Link> |{" "}
        <Link to="/products/add" className="home-link">Add</Link>
      </nav>
      <Routes>
        <Route path="list" element={<ProductList />} />
        <Route path="add" element={<ProductAdd />} />
        <Route path="detail/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default ProductPage;
