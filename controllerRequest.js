const db = require('./database');

const getAllPubRequests = async (req, res) => {
  try {
    const query = 'SELECT * FROM PubRequest';
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPubRequestById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM PubRequest WHERE User_id = ?';
    const [results] = await db.query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPubRequst = async (req, res) => {
  try {
    const newPubRequest = req.body;
    const query = 'INSERT INTO PubRequest SET ?';
    const [results] = await db.query(query, [newPubRequest]);
    res.json({ id: results.insertId, ...newPubRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePubRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM PubRequest WHERE User_id = ?';
    await db.query(query, [id]);
    res.json({ id, message: 'PubRequest видалено успішно.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPubRequests,
  getPubRequestById,
  createPubRequst,
  deletePubRequest
};
