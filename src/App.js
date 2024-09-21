import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
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
    });
  }

  return (
    <main>
      <h1>$400<span>.00</span></h1>
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
