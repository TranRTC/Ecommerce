import React, { useState } from "react";

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
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address: </label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CustomerAdd;
