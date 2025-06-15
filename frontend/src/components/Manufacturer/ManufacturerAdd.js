import React, { useState } from "react";
import "../../pages/PageStyle.css";

function ManufacturerAdd() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    website: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/manufacturers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setMessage("Manufacturer added successfully!");
        setForm({ name: "", country: "", website: "" });
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to add manufacturer.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="list-title">Add Manufacturer</h2>
      <form className="entity-form" onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country: </label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Website: </label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="detail-btn">Add</button>
      </form>
      {message && <div className="form-message">{message}</div>}
    </div>
  );
}

export default ManufacturerAdd;
