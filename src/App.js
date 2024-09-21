import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0); // New state to store balance

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
      calculateBalance(transactions); // Calculate balance when transactions are fetched
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  async function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime
      })
    });

    setName('');
    setDateTime('');
    setDescription('');

    // Refresh the transaction list
    getTransactions().then(transactions => {
      setTransactions(transactions);
      calculateBalance(transactions); // Update balance when new transaction is added
    });
  }

  async function deleteTransaction(id) {
    const url = process.env.REACT_APP_API_URL + `/transaction/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });

    // Refresh the transaction list after deletion
    getTransactions().then(transactions => {
      setTransactions(transactions);
      calculateBalance(transactions); // Update balance when a transaction is deleted
    });
  }

  // Calculate the balance based on all transactions
  function calculateBalance(transactions) {
    const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
    setBalance(totalBalance);
  }

  return (
    <main>
      {/* Display the real-time balance */}
      <h1>${balance}<span>.00</span></h1> 
      
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'+200 new samsung tv'}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={ev => setDateTime(ev.target.value)}
          />
        </div>

        <div className='description'>
          <input
            type="text"
            placeholder={'description'}
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
        </div>

        <button type='submit'>Add new transaction</button>
      </form>

      <div className='transactions'>
        {transactions.map(transaction => (
          <div className='transaction' key={transaction._id}>

            <div className='left'>
              <div className='name'>
                {transaction.name}
              </div>
              <div className='description'>
                {transaction.description}
              </div>
            </div>

            <div className='right'>
              <div className={'price ' + (transaction.price > 0 ? 'green' : 'red')}>
                {transaction.price}
              </div>
              <div className='datetime'>
                {transaction.datetime}
              </div>
              {/* Delete button */}
              <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
            </div>
            
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
