const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '987654321',
  database: 'mcanalyzer',
  insecureAuth: true
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Database connected with id ' + connection.threadId);
    connection.release();
  } catch (err) {
    console.error("Can't connect to database: " + err.stack);
  }
})();

module.exports = db;