import { useRef } from 'react';
import Modal from '../UI/Modal';

const NewTimeForm = (props) => {
  //TODO: 
  // - Create onHideForm in <App>, pass into <Form> via props when called
  //    - Should set a state in app to set form visibility to false
  // - Create submitTimeHandler to bundle input values
  //    - Then submit these input values to the api (create a path using the submitted data)
  //    - Then update fetch to get updated results that include the new time
  //    - Then set state to these new updated results to be displayed
  // - Receive curGame via props
  // - Receive curTrack via props

  const gameInputRef = useRef();
  const trackInputRef = useRef();
  const driverInputRef = useRef();
  const timeInputRef = useRef();

  const submitTimeHandler = (e) => {
    e.preventDefault()
    console.log(gameInputRef.current.value, trackInputRef.current.value, driverInputRef.current.value, timeInputRef.current.value)
  }

  // Within form define modal content
  //  This is the form itself with the labels and inputs
  //    - Game: Check if curGame exists and if not then leave input empty (may need a function to fetch that value from app)
  //            For a quick solution this can be left empty and require user input
  //    - Track: Check if curTrack exists and if not then laeve input empty (may need a function to fetch that value from app)
  //            For a quick solutoin this can be left empty and require user input
  //    - DriverName: 3 Letter uppercase initial from driver (validate this before sending)
  //    - Time: should be able to submit in either format '1:23.456' (str) || 83.456 (num)
  const modalContent = (
    <form onSubmit={submitTimeHandler}>
      <label htmlFor='gameInput'>Game:</label> <input id='gameInput' ref={gameInputRef} type='text' /><br />
      <label htmlFor='trackInput'>Track:</label> <input id='trackInput' ref={trackInputRef} type='text' /><br />
      <label htmlFor='driverInput'>Driver:</label> <input id='driverInput' ref={driverInputRef} type='text' /><br />
      <label htmlFor='timeInput'>Time:</label> <input id='timeInput' ref={timeInputRef} type='text' /><br />
      <div>
        <button type='submit'>Submit</button>
        <button onClick={props.onHideForm}>Close</button>
      </div>
    </form>
  )
  //  Within form return the modal with any props needed such as 'hideFormHandler
  return (
    <Modal onHideForm={props.onHideForm}>
      {modalContent}
    </Modal>
  )
}

export default NewTimeForm