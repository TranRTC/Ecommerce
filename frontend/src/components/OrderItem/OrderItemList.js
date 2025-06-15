import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderItemList() {
  const [orderItems, setOrderItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/orderitems")
      .then((res) => res.json())
      .then((data) => setOrderItems(data))
      .catch((err) => console.error("Error fetching order items:", err));
  }, []);

  // Filter by product_name or order_id if available
  const filtered = orderItems.filter((oi) =>
    (oi.product_name && oi.product_name.toLowerCase().includes(search.toLowerCase())) ||
    (oi.order_id && oi.order_id.toString().includes(search))
  );

  return (
    <div>
      <h2>Order Item List</h2>
      <input
        type="text"
        placeholder="Search order items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <ul>
        {filtered.map((oi) => (
          <li key={oi.id}>
            <strong>Order #{oi.order_id}</strong> | Product: {oi.product_name || oi.product_id} | Quantity: {oi.quantity}{" "}
            <Link to={`/orderitems/detail/${oi.id}`}>
              <button>Detail</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderItemList;
