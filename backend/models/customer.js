// backend/models/customer.js
const pool = require('../db');

const createCustomer = async ({ first_name, last_name, email, phone, address }) => {
  const result = await pool.query(
    'INSERT INTO customers (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [first_name, last_name, email, phone, address]
  );
  return result.rows[0];
};

const getAllCustomers = async () => {
  const result = await pool.query('SELECT * FROM customers');
  return result.rows;
};

const getCustomerById = async (id) => {
  const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
  return result.rows[0];
};

const updateCustomer = async (id, { first_name, last_name, email, phone, address }) => {
  const result = await pool.query(
    'UPDATE customers SET first_name = $1, last_name = $2, email = $3, phone = $4, address = $5 WHERE id = $6 RETURNING *',
    [first_name, last_name, email, phone, address, id]
  );
  return result.rows[0];
};

const deleteCustomer = async (id) => {
  const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
