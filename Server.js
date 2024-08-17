const express = require('express');
const app = express();
const PORT = 9876;

const WINDOW_SIZE = 10;
let storedNumbers = [];

const generateEvenNumbers = (limit) => {
    const evens = [];
    for (let i = 2; evens.length < limit; i += 2) {
        evens.push(i);
    }
    return evens;
};

const generatePrimeNumbers = (limit) => {
    const primes = [];
    let num = 2;

    while (primes.length < limit) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(num);
        num++;
    }
    return primes;
};

const generateFibonacciNumbers = (limit) => {
    const fibs = [0, 1];
    while (fibs.length < limit) {
        const nextFib = fibs[fibs.length - 1] + fibs[fibs.length - 2];
        fibs.push(nextFib);
    }
    return fibs.slice(0, limit);
};

app.get('/numbers/:numberid', (req, res) => {
    const numberId = req.params.numberid;
    let newNumbers = [];

    if (numberId === 'e') {
        newNumbers = generateEvenNumbers(WINDOW_SIZE);
    } else if (numberId === 'prime') {
        newNumbers = generatePrimeNumbers(WINDOW_SIZE);
    } else if (numberId === 'fib') {
        newNumbers = generateFibonacciNumbers(WINDOW_SIZE);
    } else {
        return res.status(400).json({ error: 'Invalid number type. Use "e" for even numbers, "prime" for prime numbers, or "fib" for Fibonacci numbers.' });
    }

    const uniqueNumbers = [...new Set([...storedNumbers, ...newNumbers])];

    if (uniqueNumbers.length > WINDOW_SIZE) {
        storedNumbers = uniqueNumbers.slice(-WINDOW_SIZE);
    } else {
        storedNumbers = uniqueNumbers;
    }

    const avg = storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length;
    res.json({
        windowPrevState: [...storedNumbers],
        windowCurrState: [...storedNumbers],
        numbers: newNumbers,
        avg: avg.toFixed(2),
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});