const db = require('./database');

const getAllMentionReports = async (req, res) => {
  try {
    const query = 'SELECT * FROM MentionReport';
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMentionReportById = async (req, res) => {
  try {
    const mentionReportId = req.params.id;
    const query = 'SELECT * FROM MentionReport WHERE id = ?';
    const [results] = await db.query(query, [mentionReportId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createMentionReport = async (req, res) => {
  try {
    const newMenRep = req.body;
    const query = 'INSERT INTO MentionReport SET ?';
    const [results] = await db.query(query, [newMenRep]);
    res.json({ id: results.insertId, ...newMenRep });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMentionReport = async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM MentionReport WHERE id = ?';
    await db.query(query, [id]);
    res.json({ id: id, message: 'Звіт видалено успішно.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMentionReport = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const query = 'UPDATE MentionReport SET ? WHERE id = ?';
    await db.query(query, [updatedData, id]);
    res.json({ id: id, ...updatedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllMentionReports,
  getMentionReportById,
  createMentionReport,
  deleteMentionReport,
  updateMentionReport
};
