import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    customer_id: "",
    order_date: "",
    status: ""
  });
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch order details and customers
  useEffect(() => {
    fetch(`http://localhost:5000/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setForm({
          customer_id: data.customer_id || "",
          order_date: data.order_date ? data.order_date.slice(0, 10) : "",
          status: data.status || "pending"
        });
      })
      .catch((err) => setMessage("Error fetching order: " + err));

    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => setMessage("Error fetching customers: " + err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          customer_id: parseInt(form.customer_id)
        })
      });
      if (response.ok) {
        setMessage("Order updated successfully!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update order.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setMessage("Order deleted.");
        setTimeout(() => navigate("/orders/list"), 1000);
      } else {
        setMessage("Failed to delete order.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h2>Order Detail</h2>
      <form onSubmit={handleUpdate}>
        <div>
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
        </div>
        <div>
          <label>Order Date: </label>
          <input
            name="order_date"
            type="date"
            value={form.order_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status: </label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: "1em", color: "red" }}>
          Delete
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderDetail;
