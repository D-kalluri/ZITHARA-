const express = require('express');
const router = express.Router();
const db = require('./db');

// for pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const { rows } = await db.query('SELECT sno, customer_name, age, phone, location, created_date AS date, created_time AS time FROM customers LIMIT $1 OFFSET $2', [limit, offset]);
    const totalCount = await db.query('SELECT COUNT(*) FROM customers');
    const totalPages = Math.ceil(totalCount.rows[0].count / limit);
    res.json({ data: rows, totalPages });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// Search customers by name or location
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const { rows } = await db.query('SELECT * FROM customers WHERE customer_name ILIKE $1 OR location ILIKE $1', [`%${query}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Error searching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Sort customers by date or time
router.get('/sort', async (req, res) => {
  const { sortBy } = req.query;
  let orderByClause;

  switch (sortBy) {
    case 'date':
      orderByClause = 'created_date';
      break;
    case 'time':
      orderByClause = 'created_time';
      break;
    default:
      orderByClause = 'created_date';
  }

  try {
    const { rows } = await db.query(`SELECT sno, customer_name, age, phone, location, created_date AS date, created_time AS time FROM customers ORDER BY ${orderByClause}`);
    res.json(rows);
  } catch (error) {
    console.error('Error sorting customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;











