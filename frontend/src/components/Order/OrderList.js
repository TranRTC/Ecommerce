import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../pages/PageStyle.css';

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
      <h2 className="list-title">Order List</h2>
      <input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <table className="entity-list">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer_name || o.customer_id}</td>
              <td>{o.order_date}</td>
              <td>{o.status}</td>
              <td>
                <Link to={`/orders/detail/${o.id}`}>
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

export default OrderList;
