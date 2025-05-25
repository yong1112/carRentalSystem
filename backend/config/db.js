const sql = require('mssql');

const config = {
  user: 'carRental',         // 👈 your SQL Server login
  password: 'yong123',     // 👈 your SQL Server password
  server: 'localhost',           // or your DB host
  database: 'carRental',        // 👈 your database name
  options: {
    encrypt: false,              // true if you're using Azure
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

module.exports = { sql, poolPromise };
