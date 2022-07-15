import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import MainHeader from './Components/MainHeader/MainHeader';
import Card from './Components/UI/Card.jsx';

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
      <MainHeader/>
      <Card>
        <ul>
        {gameData.data.length === 0 ?
          <li>nothing...</li> :
          gameData.data.map((data, i) => {
            return <li key={i}>{data.name}</li>
          })
        }
        </ul>
      </Card>
      
    </div>
  );
}

export default App;
