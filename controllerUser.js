const db = require('./database');

const getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM User';
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = 'SELECT * FROM User WHERE id = ?';
    const [results] = await db.query(query, [userId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const query = 'INSERT INTO User SET ?';
    const [results] = await db.query(query, [newUser]);
    res.json({ id: results.insertId, ...newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = 'DELETE FROM User WHERE id = ?';
    await db.query(query, [userId]);
    res.json({ id: userId, message: 'Користувач видалений успішно.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const query = 'UPDATE User SET ? WHERE id = ?';
    await db.query(query, [updatedData, id]);
    res.json({ id: id, ...updatedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
};
