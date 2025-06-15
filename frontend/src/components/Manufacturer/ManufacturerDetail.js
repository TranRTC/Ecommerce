import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../pages/PageStyle.css";

function ManufacturerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState(null);
  const [form, setForm] = useState({ name: "", country: "", website: "" });
  const [message, setMessage] = useState("");

  // Fetch manufacturer details
  useEffect(() => {
    fetch(`http://localhost:5000/manufacturers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setManufacturer(data);
        setForm({
          name: data.name || "",
          country: data.country || "",
          website: data.website || ""
        });
      })
      .catch((err) => setMessage("Error fetching manufacturer: " + err));
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/manufacturers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setMessage("Manufacturer updated successfully!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update manufacturer.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this manufacturer?")) return;
    try {
      const response = await fetch(`http://localhost:5000/manufacturers/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setMessage("Manufacturer deleted.");
        setTimeout(() => navigate("/manufacturers/list"), 1000);
      } else {
        setMessage("Failed to delete manufacturer.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!manufacturer) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="hub-title">Manufacturer Detail</h2>
      <form className="entity-form" onSubmit={handleUpdate}>
        <label>Name: </label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Country: </label>
        <input name="country" value={form.country} onChange={handleChange} />
        <label>Website: </label>
        <input name="website" value={form.website} onChange={handleChange} />
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

export default ManufacturerDetail;
