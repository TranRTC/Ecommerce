import React, { useState } from "react";
import '../../pages/PageStyle.css';

function CustomerAdd() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setMessage("Customer added successfully!");
        setForm({ name: "", email: "", address: "" });
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to add customer.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="list-title">Add Customer</h2>
      <form className="entity-form" onSubmit={handleSubmit}>
        <label>Name: </label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email: </label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
        <label>Address: </label>
        <input name="address" value={form.address} onChange={handleChange} />
        <button type="submit" className="detail-btn">Add</button>
      </form>
      {message && <div className="form-message">{message}</div>}
    </div>
  );
}

export default CustomerAdd;
