import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./PageStyle.css";
import CustomerList from "../components/Customer/CustomerList";
import CustomerAdd from "../components/Customer/CustomerAdd";
import CustomerDetail from "../components/Customer/CustomerDetail";

function CustomerPage() {
  return (
    <div>
      <h2 className="hub-title">Customers</h2>
      <nav className="hub-nav">
        <Link to="/" className="home-link">Home</Link> |{" "}
        <Link to="/customers/list" className="home-link">List</Link> |{" "}
        <Link to="/customers/add" className="home-link">Add</Link>
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
