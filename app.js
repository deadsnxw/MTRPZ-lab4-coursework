const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const db = require('./database');

const router = require('./router');

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
