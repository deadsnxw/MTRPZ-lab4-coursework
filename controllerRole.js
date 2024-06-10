const db = require('./database');

const getAllRoles = async (req, res) => {
  try {
    const query = 'SELECT * FROM Role';
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const query = 'SELECT * FROM Role WHERE id = ?';
    const [results] = await db.query(query, [roleId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRoles,
  getRoleById
};