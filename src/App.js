import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  
  useEffect(() => {
    getTransactions()
      .then(transactions => setTransactions(transactions))
      .catch(error => console.error('Error fetching transactions:', error))
      .finally(() => setLoading(false)); // End loading when done
  }, []);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  async function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          price,
          name: name.substring(price.length + 1),
          description, 
          datetime
        })
      });

      if (!res.ok) {
        throw new Error('Failed to add new transaction');
      }

      setName('');
      setDateTime('');
      setDescription('');

      const updatedTransactions = await getTransactions();
      setTransactions(updatedTransactions);

    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }

  return (
    <main>
      {loading ? <div>Loading...</div> : (
        <>
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

            <button type='submit'>
              Add new transaction
            </button>
          </form>

          <div className='transactions'>
            {transactions.map((transaction, index) => (
              <div className='transaction' key={index}>
                <div className='left'>
                  <div className='name'>{transaction.name}</div>
                  <div className='description'>{transaction.description}</div>
                </div>
                <div className='right'>
                  <div className={'price ' + (transaction.price > 0 ? 'green' : 'red')}>
                    {transaction.price}
                  </div>
                  <div className='datetime'>{transaction.datetime}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default App;
