import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [itemsA, setItemsA] = useState([]);
  const [itemsB, setItemsB] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      }).then(function (json) {
        setItemsA(json.filter((item) => {
          return !item.completed;
        }));
        setItemsB(json.filter((item) => {
          return item.completed;
        }));
      });
  }, []);

  const updateNotCompleted = () => {
    const res = [];
    
    for (let i = 0; i < itemsA.length; i++) {
      res.push(<li>
        <label className="item">
          {itemsA[i].title}&nbsp;&nbsp;
          <button onClick={e => setComplete(e, itemsA[i])}>Mark complete</button>
        </label>
      </li>);
    }
    setResult(res);
    console.log("Not Completed: " + res.length);
  };

  const buttonNotCompleted = (e) => {
    e.preventDefault();
    updateNotCompleted();
  }

  const buttonCompleted = (e) => {
    e.preventDefault();
    const res = [];
    for (let i = 0; i < itemsB.length; i++) {
      res.push(<li>
        <label className="item">
          {itemsB[i].title}
        </label>
      </li>);
    }
    setResult(res);
    console.log("Completed: " + res.length);
  }

  const setComplete = (e, item) => {
    e.preventDefault();
    let index = itemsA.indexOf(item);
    itemsA.splice(index, 1);
    itemsB.unshift(item);
    updateNotCompleted();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>TODO List</p>
        <div className="controls">
          <button onClick={buttonNotCompleted}>Show Not Completed</button>
          <button onClick={buttonCompleted}>Show Completed</button>
        </div>
        <ul>
          {result}
        </ul>
      </header>
    </div>
  );
}

export default App;
