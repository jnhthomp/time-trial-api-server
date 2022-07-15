import React from 'react'

const ResultList = (props) => {
  console.log(props.list.data)
  
  // Store all result data
  const game = props.list.data.game
  const track = props.list.data.track
  const leaderboard = props.list.data.leaderboard

  // Create a table row for each result in leaderboard array
  const tableRows = leaderboard.map((result, index) => { 
    return (
      <tr key={result._id}>
        <td>{index + 1}</td>
        <td>{result.driverInitial}</td>
        <td>{result.time}</td>
        <td>{result.car}</td>
      </tr>
    )
  })
  return (
    <React.Fragment>
      <h1>{game}: {track}</h1>
      <table>
        <thead>
        <tr>
          <th>Position</th>
          <th>Time</th>
          <th>Driver</th>
          <th>Car</th>
        </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default ResultList