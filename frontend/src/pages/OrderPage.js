import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import OrderList from "../components/Order/OrderList";
import OrderAdd from "../components/Order/OrderAdd";
import OrderDetail from "../components/Order/OrderDetail";

function OrderPage() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/orders/list">List</Link> |{" "}
        <Link to="/orders/add">Add</Link>
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
