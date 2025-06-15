import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../pages/PageStyle.css';

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
      <h2 className="list-title">Product List</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <table className="entity-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Manufacturer ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.description}</td>
              <td>{p.manufacturer_id}</td>
              <td>
                <Link to={`/products/detail/${p.id}`}>
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

export default ProductList;
