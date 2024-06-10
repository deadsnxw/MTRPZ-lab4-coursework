const db = require('./database');

const getAllResultData = async (req, res) => {
  try {
    const query = 'SELECT * FROM ResultData';
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getResultDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM ResultData WHERE id = ?';
    const [results] = await db.query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createResultData = async (req, res) => {
  try {
    const newResultData = req.body;
    const query = 'INSERT INTO ResultData SET ?';
    const [results] = await db.query(query, [newResultData]);
    res.json({ id: results.insertId, ...newResultData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteResultData = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM ResultData WHERE id = ?';
    await db.query(query, [id]);
    res.json({ id, message: 'ResultData видалено успішно.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllResultData,
  getResultDataById,
  createResultData,
  deleteResultData
};
