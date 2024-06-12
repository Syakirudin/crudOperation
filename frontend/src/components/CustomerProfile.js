// frontend/src/components/CustomerProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CustomerProfile.css';

const CustomerProfile = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', address: '' });
  const [editId, setEditId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/customers/${editId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/customers', form);
      }
      fetchCustomers();
      setForm({ first_name: '', last_name: '', email: '', phone: '', address: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleEdit = (customer) => {
    setForm(customer);
    setEditId(customer.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer', error);
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" value={form.first_name} onChange={handleInputChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={form.last_name} onChange={handleInputChange} placeholder="Last Name" required />
        <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} placeholder="Phone" required />
        <input type="text" name="address" value={form.address} onChange={handleInputChange} placeholder="Address" required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>
                <button onClick={() => handleEdit(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerProfile;

