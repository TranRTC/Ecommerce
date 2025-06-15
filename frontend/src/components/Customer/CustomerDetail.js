import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../pages/PageStyle.css';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [message, setMessage] = useState("");

  // Fetch customer details
  useEffect(() => {
    fetch(`http://localhost:5000/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          address: data.address || ""
        });
      })
      .catch((err) => setMessage("Error fetching customer: " + err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setMessage("Customer updated successfully!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update customer.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      const response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setMessage("Customer deleted.");
        setTimeout(() => navigate("/customers/list"), 1000);
      } else {
        setMessage("Failed to delete customer.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="list-title">Customer Detail</h2>
      <form className="entity-form" onSubmit={handleUpdate}>
        <label>Name: </label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email: </label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
        <label>Address: </label>
        <input name="address" value={form.address} onChange={handleChange} />
        <button type="submit" className="detail-btn">Update</button>
        <button
          type="button"
          className="detail-btn"
          style={{ background: "#e53935", marginLeft: "1em" }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
      {message && <div className="form-message">{message}</div>}
    </div>
  );
}

export default CustomerDetail;
