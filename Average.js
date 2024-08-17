import React, { useState } from 'react';

function AverageCalculator() {
  const [numbers, setNumbers] = useState([]);
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    try {
      const response = await fetch('http://localhost:9876/numbers/e');
      const data = await response.json();

      if (response.ok) {
        setPrevState(data.windowPrevState);
        setCurrState(data.windowCurrState);
        setNumbers(data.numbers);
        setAverage(data.avg);
        setError(null);
      } else {
        setError('Failed to fetch numbers');
      }
    } catch (err) {
      setError('Error fetching numbers');
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h2>Previous State:</h2>
      <p>{prevState.join(', ')}</p>
      
      <h2>Current State:</h2>
      <p>{currState.join(', ')}</p>
      
      <h2>Numbers Fetched:</h2>
      <p>{numbers.join(', ')}</p>
      
      <h2>Average:</h2>
      <p>{average !== null ? average : 'N/A'}</p>
    </div>
  );
}

export default AverageCalculator;
