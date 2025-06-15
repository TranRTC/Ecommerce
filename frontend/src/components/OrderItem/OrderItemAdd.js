import React, { useState, useEffect } from "react";

function OrderItemAdd() {
  const [form, setForm] = useState({
    order_id: "",
    product_id: "",
    quantity: 1
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch orders and products for the dropdowns
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => setMessage("Error fetching orders: " + err));

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setMessage("Error fetching products: " + err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/orderitems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          order_id: parseInt(form.order_id),
          product_id: parseInt(form.product_id),
          quantity: parseInt(form.quantity)
        })
      });
      if (response.ok) {
        setMessage("Order item added successfully!");
        setForm({ order_id: "", product_id: "", quantity: 1 });
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to add order item.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Add Order Item</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderItemAdd;
