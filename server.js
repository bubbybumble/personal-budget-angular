const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));



app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

app.get('/budget', (req, res) => {

  res.json( require(__dirname + '/chart-data.json') );
});

app.listen(port, () => {
  console.log(`Example app listening at localhost:${port}`);
});