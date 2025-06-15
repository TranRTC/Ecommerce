import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ManufacturerList from "../components/Manufacturer/ManufacturerList";
import ManufacturerAdd from "../components/Manufacturer/ManufacturerAdd";
import ManufacturerDetail from "../components/Manufacturer/ManufacturerDetail";
import "./PageStyle.css";

function ManufacturerPage() {
  return (
    <div>
      <h2 className="hub-title">Manufacturers</h2>
      <nav className="hub-nav">
        <Link to="/" className="home-link">Home</Link> |{" "}
        <Link to="/manufacturers/list" className="home-link">List</Link> |{" "}
        <Link to="/manufacturers/add" className="home-link">Add</Link>
      </nav>
      <Routes>
        <Route path="list" element={<ManufacturerList />} />
        <Route path="add" element={<ManufacturerAdd />} />
        <Route path="detail/:id" element={<ManufacturerDetail />} />
      </Routes>
    </div>
  );
}

export default ManufacturerPage;
