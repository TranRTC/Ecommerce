import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../pages/PageStyle.css';

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/manufacturers")
      .then((res) => res.json())
      .then((data) => setManufacturers(data))
      .catch((err) => console.error("Error fetching manufacturers:", err));
  }, []);

  // Filter manufacturers by search term (case-insensitive)
  const filtered = manufacturers.filter((m) =>
    m.name && m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="list-title">Manufacturer List</h2>
      <input
        type="text"
        placeholder="Search manufacturers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <div>Current search: {search}</div>
      <table className="entity-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.country}</td>
              <td>{m.website}</td>
              <td>
                <Link to={`/manufacturers/detail/${m.id}`}>
                  <button className="detail-btn">Detail</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManufacturerList;
