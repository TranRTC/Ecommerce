import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./PageStyle.css";
import OrderList from "../components/Order/OrderList";
import OrderAdd from "../components/Order/OrderAdd";
import OrderDetail from "../components/Order/OrderDetail";

function OrderPage() {
  return (
    <div>
      <h2 className="hub-title">Orders</h2>
      <nav className="hub-nav">
        <Link to="/" className="home-link">Home</Link> |{" "}
        <Link to="/orders/list" className="home-link">List</Link> |{" "}
        <Link to="/orders/add" className="home-link">Add</Link>
      </nav>
      <Routes>
        <Route path="list" element={<OrderList />} />
        <Route path="add" element={<OrderAdd />} />
        <Route path="detail/:id" element={<OrderDetail />} />
      </Routes>
    </div>
  );
}

export default OrderPage;
