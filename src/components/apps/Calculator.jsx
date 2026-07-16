import React, { useState } from 'react';
import '../../styles/apps/calculator.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', 'DEL'
  ];

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  return (
    <div className="calculator">
      <div className="calc-display">{display}</div>
      <div className="calc-buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={`calc-btn ${
              ['/', '*', '-', '+', '='].includes(btn) ? 'operator' : ''
            } ${['C', 'DEL'].includes(btn) ? 'special' : ''}`}
            onClick={() => {
              if (btn === '=') handleEquals();
              else if (btn === 'C') handleClear();
              else if (btn === 'DEL') handleDelete();
              else if (['+', '-', '*', '/'].includes(btn)) handleOperation(btn);
              else if (btn === '.') handleDecimal();
              else handleNumber(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
