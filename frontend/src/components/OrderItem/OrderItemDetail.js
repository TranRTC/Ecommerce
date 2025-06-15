import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../pages/PageStyle.css';

function OrderItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderItem, setOrderItem] = useState(null);
  const [form, setForm] = useState({
    order_id: "",
    product_id: "",
    quantity: 1
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch order item details, orders, and products
  useEffect(() => {
    fetch(`http://localhost:5000/orderitems/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderItem(data);
        setForm({
          order_id: data.order_id || "",
          product_id: data.product_id || "",
          quantity: data.quantity || 1
        });
      })
      .catch((err) => setMessage("Error fetching order item: " + err));

    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => setMessage("Error fetching orders: " + err));

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setMessage("Error fetching products: " + err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/orderitems/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          order_id: parseInt(form.order_id),
          product_id: parseInt(form.product_id),
          quantity: parseInt(form.quantity)
        })
      });
      if (response.ok) {
        setMessage("Order item updated successfully!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update order item.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this order item?")) return;
    try {
      const response = await fetch(`http://localhost:5000/orderitems/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setMessage("Order item deleted.");
        setTimeout(() => navigate("/orderitems/list"), 1000);
      } else {
        setMessage("Failed to delete order item.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!orderItem) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="list-title">Order Item Detail</h2>
      <form className="entity-form" onSubmit={handleUpdate}>
        <div>
          <label>Order: </label>
          <select
            name="order_id"
            value={form.order_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Order</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                Order #{o.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Product: </label>
          <select
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity: </label>
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
          />
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

export default OrderItemDetail;
