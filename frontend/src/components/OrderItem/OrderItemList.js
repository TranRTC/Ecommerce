import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../pages/PageStyle.css';

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
      <h2 className="list-title">Order Item List</h2>
      <input
        type="text"
        placeholder="Search order items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <table className="entity-list">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((oi) => (
            <tr key={oi.id}>
              <td>{oi.order_id}</td>
              <td>{oi.product_name || oi.product_id}</td>
              <td>{oi.quantity}</td>
              <td>
                <Link to={`/orderitems/detail/${oi.id}`}>
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

export default OrderItemList;
