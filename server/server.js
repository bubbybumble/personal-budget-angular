const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
// Stopped video at 17:55

app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

app.get('/budget', (req, res) => {

  res.json( require(__dirname + '/chart-data.json') );
});

app.listen(port, () => {
  console.log(`API listening at localhost:${port}`);
});