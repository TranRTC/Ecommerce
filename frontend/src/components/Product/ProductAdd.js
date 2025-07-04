import React, { useState, useEffect } from "react";
import '../../pages/PageStyle.css';

function ProductAdd() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    manufacturer_id: ""
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [message, setMessage] = useState("");

  // 1. Fetch manufacturers for the dropdown
  useEffect(() => {
    fetch("http://localhost:5000/manufacturers")
      .then((res) => res.json())
      .then((data) => setManufacturers(data))
      .catch((err) => setMessage("Error fetching manufacturers: " + err));
  }, []);

  // 3. Update form state when a field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          manufacturer_id: parseInt(form.manufacturer_id)
        })
      });
      if (response.ok) {
        setMessage("Product added successfully!");
        setForm({ name: "", price: "", description: "", manufacturer_id: "" });
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to add product.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="list-title">Add Product</h2>
      <form className="entity-form" onSubmit={handleSubmit}>
        <label>Name: </label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Price: </label>
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
        />
        <label>Description: </label>
        <input name="description" value={form.description} onChange={handleChange} />
        <label>Manufacturer: </label>
        <select
          name="manufacturer_id"
          value={form.manufacturer_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Manufacturer</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <button type="submit" className="detail-btn">Add</button>
      </form>
      {message && <div className="form-message">{message}</div>}
    </div>
  );
}

export default ProductAdd;
