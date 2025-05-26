const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// GET /api/cars
router.get('/cars', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Cars');
    res.json({ cars: result.recordset });
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders
router.get('/orders', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Orders');
    res.json({ orders: result.recordset });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/orders
router.post('/orders', async (req, res) => {
  try {
    const pool = await poolPromise;
    const { customer, car, rental } = req.body;

    const newOrderId = uuidv4();

    await pool.request()
      .input('orderId', sql.UniqueIdentifier, newOrderId)
      .input('customerName', sql.VarChar, customer.name)
      .input('phoneNumber', sql.VarChar, customer.phoneNumber)
      .input('email', sql.VarChar, customer.email)
      .input('driversLicenseNumber', sql.VarChar, customer.driversLicenseNumber)
      .input('carVin', sql.VarChar, car.vin)
      .input('startDate', sql.Date, rental.startDate)
      .input('rentalPeriod', sql.Int, rental.rentalPeriod)
      .input('totalPrice', sql.Int, rental.totalPrice)
      .input('orderDate', sql.Date, rental.orderDate)
      .input('status', sql.VarChar, 'pending')
      .query(`
        INSERT INTO Orders (
          orderId, customerName, phoneNumber, email,
          driversLicenseNumber, carVin, startDate,
          rentalPeriod, totalPrice, orderDate, status
        )
        VALUES (
          @orderId, @customerName, @phoneNumber, @email,
          @driversLicenseNumber, @carVin, @startDate,
          @rentalPeriod, @totalPrice, @orderDate, @status
        )
      `);

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrderId });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/orders/confirm/:orderId
router.post('/orders/confirm/:orderId', async (req, res) => {
  try {
    const pool = await poolPromise;
    const orderId = req.params.orderId;

    const orderResult = await pool.request()
      .input('orderId', sql.UniqueIdentifier, orderId)
      .query('SELECT * FROM Orders WHERE orderId = @orderId');

    const order = orderResult.recordset[0];
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status === 'confirmed') return res.json({ message: 'Already confirmed' });

    await pool.request()
      .input('vin', sql.VarChar, order.carVin)
      .query('UPDATE Cars SET available = 0 WHERE vin = @vin');

    await pool.request()
      .input('orderId', sql.UniqueIdentifier, orderId)
      .query("UPDATE Orders SET status = 'confirmed' WHERE orderId = @orderId");

    res.json({ message: 'Order confirmed successfully' });
  } catch (err) {
    console.error('Error confirming order:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
