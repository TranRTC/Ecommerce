import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ManufacturerList from "../components/Manufacturer/ManufacturerList";
import ManufacturerAdd from "../components/Manufacturer/ManufacturerAdd";
import ManufacturerDetail from "../components/Manufacturer/ManufacturerDetail";

function ManufacturerPage() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/manufacturers/list">List</Link> |{" "}
        <Link to="/manufacturers/add">Add</Link>
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
