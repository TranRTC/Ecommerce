import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <h2>Manufacturer List</h2>
      <input
        type="text"
        placeholder="Search manufacturers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <div>Current search: {search}</div>
      <ul>
        {filtered.map((m) => (
          <li key={m.id}>
            <strong>{m.name}</strong> | {m.country} | {m.website}
            <Link to={`/manufacturers/detail/${m.id}`}>
              <button>Detail</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManufacturerList;
