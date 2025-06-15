import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProductList from "../components/Product/ProductList";
import ProductAdd from "../components/Product/ProductAdd";
import ProductDetail from "../components/Product/ProductDetail";

function ProductPage() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/products/list">List</Link> |{" "}
        <Link to="/products/add">Add</Link>
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
