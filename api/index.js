const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json('test ok2');
});

app.post('/api/transaction', async(req,res) => {
  // connect to the database
  await mongoose.connect(process.env.MONGO_URL);
  // get info out of req post body
  const {price, name, description, datetime} = req.body;
  // use transaction model to format info
  const transaction = await Transaction.create({price, name, description, datetime});
  // post data
  res.json(transaction);
})

app.get('/api/transactions', async(req,res) => {
  // connect to db
  await mongoose.connect(process.env.MONGO_URL);
  // get all records in db
  const transactions = await Transaction.find();
  // give data back to user
  res.json(transactions);
});

app.listen(4040);