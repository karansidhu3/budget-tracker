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
  try {
    // use transaction model to format info
    const transaction = await Transaction.create({ price, name, description, datetime });
    // send created transaction back as response
    res.json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
})

app.get('/api/transactions', async(req,res) => {
  // connect to db
  await mongoose.connect(process.env.MONGO_URL);
  try {
    // get all records in db
    const transactions = await Transaction.find();
    // give data back to user
    const formattedTransactions = transactions.map(transaction => ({
      ...transaction._doc,
      datetime: new Date(transaction.datetime).toLocaleString() // format datetime
    }));
    res.json(transactions);

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Delete a transaction by ID
app.delete('/api/transaction/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Find transaction by ID and delete
    await Transaction.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});


app.listen(4040, () => {
  console.log('Server is running on port 4040...');
});