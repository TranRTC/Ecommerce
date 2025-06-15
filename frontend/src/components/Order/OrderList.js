import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Filter by customer_name or status if available, otherwise by id
  const filtered = orders.filter((o) =>
    (o.customer_name && o.customer_name.toLowerCase().includes(search.toLowerCase())) ||
    (o.status && o.status.toLowerCase().includes(search.toLowerCase())) ||
    (o.id && o.id.toString().includes(search))
  );

  return (
    <div>
      <h2>Order List</h2>
      <input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <ul>
        {filtered.map((o) => (
          <li key={o.id}>
            <strong>Order #{o.id}</strong> | Customer: {o.customer_name || o.customer_id} | Date: {o.order_date} | Status: {o.status}{" "}
            <Link to={`/orders/detail/${o.id}`}>
              <button>Detail</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
