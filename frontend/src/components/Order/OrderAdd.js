import React, { useState, useEffect } from "react";
import '../../pages/PageStyle.css';

function OrderAdd() {
  const [form, setForm] = useState({
    customer_id: "",
    order_date: "",
    status: "pending"
  });
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch customers for the dropdown
  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => setMessage("Error fetching customers: " + err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          customer_id: parseInt(form.customer_id)
        })
      });
      if (response.ok) {
        setMessage("Order added successfully!");
        setForm({ customer_id: "", order_date: "", status: "pending" });
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to add order.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="list-title">Add Order</h2>
      <form className="entity-form" onSubmit={handleSubmit}>
        <label>Customer: </label>
        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label>Order Date: </label>
        <input
          name="order_date"
          type="date"
          value={form.order_date}
          onChange={handleChange}
          required
        />
        <label>Status: </label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit" className="detail-btn">Add</button>
      </form>
      {message && <div className="form-message">{message}</div>}
    </div>
  );
}

export default OrderAdd;
