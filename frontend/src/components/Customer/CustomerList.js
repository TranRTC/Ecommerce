import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  const filtered = customers.filter((c) =>
    (c.name && c.name.toLowerCase().includes(search.toLowerCase())) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <ul>
        {filtered.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> | {c.email} | {c.address}{" "}
            <Link to={`/customers/detail/${c.id}`}>
              <button>Detail</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
