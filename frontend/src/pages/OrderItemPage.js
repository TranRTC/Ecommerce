import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./PageStyle.css";
import OrderItemList from "../components/OrderItem/OrderItemList";
import OrderItemAdd from "../components/OrderItem/OrderItemAdd";
import OrderItemDetail from "../components/OrderItem/OrderItemDetail";

function OrderItemPage() {
  return (
    <div>
      <h2 className="hub-title">Order Items</h2>
      <nav className="hub-nav">
        <Link to="/" className="home-link">Home</Link> |{" "}
        <Link to="/orderitems/list" className="home-link">List</Link> |{" "}
        <Link to="/orderitems/add" className="home-link">Add</Link>
      </nav>
      <Routes>
        <Route path="list" element={<OrderItemList />} />
        <Route path="add" element={<OrderItemAdd />} />
        <Route path="detail/:id" element={<OrderItemDetail />} />
      </Routes>
    </div>
  );
}

export default OrderItemPage;
