const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = {myBudget: [
  {
    title: 'Eat Out',
    budget: 30
  },
  {
    title: 'Groceries',
    budget: 90
  },
  {
    title: 'Rent',
    budget: 350
  },
]};

app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

app.get('/budget', (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`Example app listening at localhost:${port}`);
});