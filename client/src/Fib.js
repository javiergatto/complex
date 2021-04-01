import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fib() {
  const [index, setIndex] = useState('');
  const [values, setValues] = useState({});
  const [seenIndexes, setSeenIndexes] = useState([]);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  },[index]);

  const fetchValues = () => {
    axios.get('/api/values/current')
    .then(function(response){
      setValues(response.data);
    });
  }

  const fetchIndexes = () => {
    axios.get('/api/values/all')
    .then(function(response){
      setSeenIndexes(response.data);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/values', {
      index: index,
    }).then(function(response){
      setIndex('');
    });
  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={index}
            onChange={(event) => setIndex(event.target.value )}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        <div>{seenIndexes.map(({ number }) => number).join(', ')}</div>


        <h3>Calculated Values:</h3>
        { Object.values(values).map((value, key) => (
          <div key={key}>
             For index {key} I calculated {value}
          </div>
        ))}

      </div>
    );

}

export default Fib;
