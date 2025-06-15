import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import CustomerList from "../components/Customer/CustomerList";
import CustomerAdd from "../components/Customer/CustomerAdd";
import CustomerDetail from "../components/Customer/CustomerDetail";

function CustomerPage() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/customers/list">List</Link> |{" "}
        <Link to="/customers/add">Add</Link>
      </nav>
      <Routes>
        <Route path="list" element={<CustomerList />} />
        <Route path="add" element={<CustomerAdd />} />
        <Route path="detail/:id" element={<CustomerDetail />} />
      </Routes>
    </div>
  );
}

export default CustomerPage;
