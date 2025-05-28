const sql = require('mssql');

const config = {
  user: 'admin',       
  password: 'Yong1234',     
  server: 'db.cxh6bhwtgrow.us-east-1.rds.amazonaws.com',        
  database: 'carRental',       
  options: {
    encrypt: false,           
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
