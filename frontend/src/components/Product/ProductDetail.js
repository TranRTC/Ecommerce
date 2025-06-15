import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    manufacturer_id: ""
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch product details and manufacturers
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setForm({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          manufacturer_id: data.manufacturer_id || ""
        });
      })
      .catch((err) => setMessage("Error fetching product: " + err));

    fetch("http://localhost:5000/manufacturers")
      .then((res) => res.json())
      .then((data) => setManufacturers(data))
      .catch((err) => setMessage("Error fetching manufacturers: " + err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          manufacturer_id: parseInt(form.manufacturer_id)
        })
      });
      if (response.ok) {
        setMessage("Product updated successfully!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update product.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setMessage("Product deleted.");
        setTimeout(() => navigate("/products/list"), 1000);
      } else {
        setMessage("Failed to delete product.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Product Detail</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
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
        </div>
        <div>
          <label>Description: </label>
          <input name="description" value={form.description} onChange={handleChange} />
        </div>
        <div>
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

export default ProductDetail;
