import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      <h2>Customer Detail</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: "1em", color: "red" }}>
          Delete
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CustomerDetail;
