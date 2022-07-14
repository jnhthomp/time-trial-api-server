import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [gameData, setGameData] = useState({type: null, data:[]})

  useEffect(() => {
    // Initial fetch to get list of games
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setGameData({
          type: 'games',
          data
        })
      })
      .catch(error => console.log(error))  
  }, [])


  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {gameData.data.length === 0 ?
            <li>nothing...</li> :
            gameData.data.map((data, i) => { 
              return <li key={i}>{data.name}</li>
             })
          }
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
