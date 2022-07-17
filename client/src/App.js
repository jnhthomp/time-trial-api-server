import { useEffect, useState } from 'react';
import './App.css';
import MainHeader from './Components/MainHeader/MainHeader';
import Card from './Components/UI/Card.jsx';
import PickList from './Components/PickList/PickList';
import ResultList from './Components/ResultList/ResultList';
import NewTimeForm from './Components/NewTimeForm/NewTimeForm';

function App() {
  const [showForm, setShowForm] = useState(false)
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
      url += `/${curGame}`
      url += `/${itemName}`
    }

    // console.log(url);
    let fetchedData = await fetch(url)
      .then((response) => response.json())
      .then((data) => data)

    // Update state
    const newGameDataType = itemType === 'game' ? 'track' : 'result';
    const newGameData = fetchedData;
    
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

  const updateLeaderboard = (newLeaderboard) => {
    // set gameData to new leaderboard data
    setGameData({type: 'result', data: {game: newLeaderboard.game, track: newLeaderboard.track, leaderboard: newLeaderboard.leaderboard}})
    setCurGame(newLeaderboard.game)
    setCurTrack(newLeaderboard.track)
  }

  const onHideForm = () => { 
    setShowForm(false);
  }

  const onShowForm = () => {
    setShowForm(true);
  }
  // Determine content to show
  const content = gameData.type === 'game' || gameData.type === 'track' ?
    <PickList
      list={gameData}
      fetchListItem={(itemName, itemType) => fetchData(itemName, itemType)}
    /> :
    <ResultList list={gameData} showForm={onShowForm}/>

  // console.log(gameData)
  return (
    <div className="App">
      {showForm && <NewTimeForm onHideForm={onHideForm} curGame={curGame} curTrack={curTrack} updateLeaderboard={updateLeaderboard}/>}
      <MainHeader/>
      <Card showform={onShowForm}>
        {
          gameData.data.length === 0 ? 
            <p><span>Loading...</span></p> : 
            content
        }
      </Card>
      
    </div>
  );
}

export default App;
