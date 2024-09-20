import { useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [datetime, setDateTime] = useState('');
  const [description, setDescription] = useState('');

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description, 
        datetime
      })
    }).then(response => {
      response.json().then(json => {
        setName('')
        setDateTime('')
        setDescription('')
        console.log('result', json);
      });
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
            placeholder={'+200 nwe samsung tv'} 
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
        <div className='transaction'>

          <div className='left'>
            <div className='name'>
              New Samsung TV
            </div>
            <div className='description'>
              time for a new tv
            </div>
          </div>

          <div className='right'>
            <div className='price red'>
              -$500
            </div>
            <div className='datetime'>
              2022-12-18 15:45
            </div>
          </div>
        </div>

        <div className='transaction'>

          <div className='left'>
            <div className='name'>
              New Job
            </div>
            <div className='description'>
              paycheck
            </div>
          </div>

          <div className='right'>
            <div className='price green'>
              +$400
            </div>
            <div className='datetime'>
              2022-12-18 15:45
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
