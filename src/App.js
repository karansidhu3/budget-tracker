import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [amount, setAmount] = useState(''); // State for amount
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getTransactions().then(transactions => {
      // Sort transactions by datetime here
      setTransactions(transactions);
      calculateBalance(transactions); // Calculate balance when transactions are fetched
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    const temptrans = await response.json();

    temptrans.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return temptrans
  }
  

  async function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price: parseFloat(amount), // Ensure amount is a float for cents
        name,
        datetime
      })
    });

    setName('');
    setDateTime('');
    setAmount(''); // Clear the amount input

    getTransactions().then(transactions => {
      setTransactions(transactions);
      calculateBalance(transactions);
    });
  }

  async function deleteTransaction(id) {
    const url = process.env.REACT_APP_API_URL + `/transaction/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });

    getTransactions().then(transactions => {
      setTransactions(transactions);
      calculateBalance(transactions);
    });
  }

  function calculateBalance(transactions) {
    const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
    setBalance(totalBalance);
  }

  let lastMonthYear = '';


  return (
    <main>
      <h1 className={(balance > 0 ? 'green' : 'red')}>${balance.toFixed(2)}</h1>
      
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'Transaction Name'}
          />
          <input
            type="number" 
            step="0.01" // Allow for cents input
            value={amount}
            onChange={ev => setAmount(ev.target.value)}
            placeholder={'Amount'}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={ev => setDateTime(ev.target.value)}
          />
        </div>

        <button type='submit'>Add Transaction</button>
      </form>

      <div className='transactions'>
        {transactions.map(transaction => {
          const date = new Date(transaction.datetime);
          const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

          const renderGap = lastMonthYear !== monthYear;
          lastMonthYear = monthYear; // Update the lastMonthYear variable

          return (
            <div key={transaction._id}>
              {renderGap && (
                <>
                  <h2>{monthYear}</h2> {/* Month and Year Header */}
                  <div style={{ margin: '10px 0' }} /> {/* Gap */}
                </>
              )}
              <div className='transaction'>
                <div className='left'>
                  <div className='name'>{transaction.name}</div>
                </div>
                <div className='right'>
                  <div className={'price ' + (transaction.price > 0 ? 'green' : 'red')}>
                    {transaction.price}
                  </div>
                  <div className='datetime'>{new Date(transaction.datetime).toLocaleString()}</div>
                  <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
