import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filtered = products.filter((p) =>
    p.name && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> | ${p.price} | {p.description} | Manufacturer ID: {p.manufacturer_id}{" "}
            <Link to={`/products/detail/${p.id}`}>
              <button>Detail</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
