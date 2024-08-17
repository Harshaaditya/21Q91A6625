import React, { useState, useEffect } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [windowSize, setWindowSize] = useState(10); 
  const [prevState, setPrevState] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    if (numbers.length === windowSize) {
      calculateAverage();
    }
  }, [numbers]);

  const calculateAverage = () => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    setAvg((sum / numbers.length).toFixed(2));
  };

  const handleAddNumber = (newNumbers) => {
    setPrevState([...numbers]);

    const uniqueNumbers = newNumbers.filter(num => !numbers.includes(num));
    let updatedNumbers = [...numbers, ...uniqueNumbers];

    if (updatedNumbers.length > windowSize) {
      updatedNumbers = updatedNumbers.slice(updatedNumbers.length - windowSize);
    }

    setNumbers(updatedNumbers);
  };

  const fetchNumbers = () => {
    const response = [1, 3, 5, 7]; 

    if (response.length > 0) {
      handleAddNumber(response);
    }
  };

  return (
    <div>
      <h1>Average Calculator Microservice</h1>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <div>
        <h2>Window Previous State: {JSON.stringify(prevState)}</h2>
        <h2>Window Current State: {JSON.stringify(numbers)}</h2>
        <h2>Numbers Fetched: {JSON.stringify(numbers)}</h2>
        <h2>Average: {avg}</h2>
      </div>
    </div>
  );
}

export default App;
