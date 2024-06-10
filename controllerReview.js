const db = require('./database');

const getAllPubReview = async (req, res) => {
  try {
    const query = 'SELECT * FROM PubReview';
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPubReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM PubReview WHERE User_id = ?';
    const [results] = await db.query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPubReview = async (req, res) => {
  try {
    const newPubReview = req.body;
    const query = 'INSERT INTO PubReview SET ?';
    const [results] = await db.query(query, [newPubReview]);
    res.json({ id: results.insertId, ...newPubReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePubReview = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM PubReview WHERE User_id = ?';
    await db.query(query, [id]);
    res.json({ id, message: 'PubReview видалено успішно.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePubReview = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const query = 'UPDATE PubReview SET ? WHERE id = ?';
    await db.query(query, [updatedData, id]);
    res.json({ id: id, ...updatedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPubReview,
  getPubReviewById,
  createPubReview,
  deletePubReview,
  updatePubReview
};
