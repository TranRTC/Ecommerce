import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import OrderItemList from "../components/OrderItem/OrderItemList";
import OrderItemAdd from "../components/OrderItem/OrderItemAdd";
import OrderItemDetail from "../components/OrderItem/OrderItemDetail";

function OrderItemPage() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/orderitems/list">List</Link> |{" "}
        <Link to="/orderitems/add">Add</Link>
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
