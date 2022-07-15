import { useEffect, useState } from 'react';
import './App.css';
import MainHeader from './Components/MainHeader/MainHeader';
import Card from './Components/UI/Card.jsx';
import PickList from './Components/PickList/PickList';

function App() {
  const [gameData, setGameData] = useState({type: null, data:[]});
  const [curGame, setCurGame] = useState();
  const [curTrack, setCurTrack] = useState();
  
  // Stuff to do on initial page load...
  useEffect(() => {
    // Initial fetch to get list of games
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        // console.log(data) // Log initial fetch request
        setGameData({
          type: 'game',
          data
        })
      })
      .catch(error => console.log(error));
  }, []);

  // Fetch Data and update state to reflect fetched data and what kind of data is being stored
  const fetchData = async (itemName, itemType) => {
    // Build a fetch url string based on the selected
    let url = `/api`
    if(itemType === 'game'){
      url += `/${itemName}`
    } else if(itemType === 'track'){
      url += curGame
      url += itemName
    }

    let fetchedData = await fetch(url)
      .then((response) => response.json())
      .then((data) => data)

    // Update state
    const newGameDataType = itemType === 'game' ? 'track' : 'result';
    const newGameData = fetchedData;
    console.log(newGameData)
    // gameData needs to hold fetched tracks or time data (whatever was fetched)
    // gameData needs to be updated to what type of data it is holding
    setGameData({ type: newGameDataType, data: newGameData })
    
    // if a game was selected curGame needs updated
    if(itemType === 'game'){
      setCurGame(itemName);
    } else if(itemType === 'track'){ 
      // if a track was selected then curTrack needs updated
      setCurTrack(itemName)
    }
  }

  console.log(gameData, curGame, curTrack)
  return (
    <div className="App">
      <MainHeader/>
      <Card>
        {
          gameData.data.length === 0 ? 
            <p><span>Loading...</span></p> : 
            <PickList 
              list={gameData}
              fetchListItem={(itemName, itemType) => fetchData(itemName, itemType)}
            />
        }
      </Card>
      
    </div>
  );
}

export default App;
