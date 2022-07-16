import classes from './NewTimeForm.module.css'
import Modal from '../UI/Modal';
import useInput from '../../hooks/use-input'

const NewTimeForm = (props) => {
  //TODO: 
  // - Create validation methods for each input field
  // - Create method to check if App state has values for curGame, and curTrack
  //    If so then run a method that will run 'gameInputChangeHandler' and 'trackInputChangeHandler'
  //    These two methods should accept the values for curGame and curTrack respectively
  //    This should load the form with the current game and track already filled
  // - Create submitTimeHandler to bundle input values
  //    - Then submit these input values to the api (create a path using the submitted data)
  //    - Then update fetch to get updated results that include the new time
  //    - Then set state to these new updated results to be displayed
  // - Receive curGame via props
  // - Receive curTrack via props
  // - Update to use this format: https://github.com/jnhthomp/react-forms-practice

  const { // game input management and validation
    value: gameInputValue, // 
    isValid: gameInputIsValid,
    hasError: gameInputHasError,
    updateValue: gameInputChangeHandler,
    updateTouched: gameInputTouchHandler,
    reset: resetGameInput
  } = useInput(value => value.length > 5);

  const { // track input management and validation
    value: trackInputValue, // 
    isValid: trackInputIsValid,
    hasError: trackInputHasError,
    updateValue: trackInputChangeHandler,
    updateTouched: trackInputTouchHandler,
    reset: resetTrackInput
  } = useInput(value => value.length > 0);

  const { // driver input management and validation
    value: driverInputValue, // 
    isValid: driverInputIsValid,
    hasError: driverInputHasError,
    updateValue:driverInputChangeHandler,
    updateTouched: driverInputTouchHandler,
    reset: resetDriverInput
  } = useInput(value => value.length > 0);

  const { // time input management and validation
    value: timeInputValue, // 
    isValid: timeInputIsValid,
    hasError: timeInputHasError,
    updateValue: timeInputChangeHandler,
    updateTouched: timeInputTouchHandler,
    reset: resetTimeInput
  } = useInput(value => value.length > 0);

  const { // car input management and validation
    value: carInputValue, // 
    isValid: carInputIsValid,
    hasError: carInputHasError,
    updateValue: carInputChangeHandler,
    updateTouched: carInputTouchHandler,
    reset: resetCarInput
  } = useInput(value => value.length > 0);


  // Initially form is invalid since no input
  let formIsValid = false;
  // After each state change these values will be re-evaluated and confirm the form validity
  if(gameInputIsValid && trackInputIsValid && driverInputIsValid && timeInputIsValid && carInputIsValid){
    formIsValid = true
  }

  // Check form validity and submit to api
  const submitTimeHandler = async (e) => {
    e.preventDefault()
    
    if(!formIsValid){
      // Form is not valid, do not continue with submission
      return;
    }

    console.log(`Game: ${gameInputValue}`)
    console.log(`Track: ${trackInputValue}`)
    console.log(`Driver: ${driverInputValue}`)
    console.log(`Time: ${timeInputValue}`)
    console.log(`Car: ${carInputValue}`)

    // Reset form inputs
    resetGameInput()
    resetTrackInput()
    resetDriverInput()
    resetTimeInput()
    resetCarInput()
  }

  // Apply error classes based on form state
  let gameInputClassList = !gameInputHasError ?
    'form-control' :
    'form-control invalid'
  
  let trackInputClassList = !trackInputHasError ?
    'form-control' :
    'form-control invalid'

  let driverInputClassList = !driverInputHasError ?
    'form-control' :
    'form-control invalid'

  let timeInputClassList = !timeInputHasError ?
    'form-control' :
    'form-control invalid'

  let carInputClassList = !carInputHasError ?
    'form-control' :
    'form-control invalid'

  

  // Within form define modal content
  //  This is the form itself with the labels and inputs
  //    - Game: Check if curGame exists and if not then leave input empty (may need a function to fetch that value from app)
  //            For a quick solution this can be left empty and require user input
  //    - Track: Check if curTrack exists and if not then laeve input empty (may need a function to fetch that value from app)
  //            For a quick solutoin this can be left empty and require user input
  //    - DriverName: 3 Letter uppercase initial from driver (validate this before sending)
  //    - Time: should be able to submit in either format '1:23.456' (str) || 83.456 (num)

  const modalContent = (
    <form onSubmit={submitTimeHandler} autoComplete='off'>
      <div className={classes['control-group']}>
        {/* Game input */}
        <div className={gameInputClassList}>
          <label htmlFor='gameInput'>Game:</label>
          <input 
            type='text' 
            id='gameInput' 
            onChange={gameInputChangeHandler}
            onBlur={gameInputTouchHandler}
            value={gameInputValue}
          />
        </div>
        {/* Display error message for game */}
        { gameInputHasError && <p>Game cannot have spaces (use '_' instead) and must be lowercase</p>}
        {/* Track input */}
        <div className={trackInputClassList}>
          <label htmlFor='trackInput'>Track:</label>
          <input
            type='text'
            id='trackInput'
            onChange={trackInputChangeHandler}
            onBlur={trackInputTouchHandler}
            value={trackInputValue}
          />
        </div>
        {/* Display error message for track */}
        {trackInputHasError && <p>Track cannot have spaces (use '_' instead) and must be lowercase</p>}
        {/* Driver input */}
        <div className={driverInputClassList}>
          <label htmlFor='driverInput'>Driver Initials:</label>
          <input
            type='text'
            id='driverInput'
            onChange={driverInputChangeHandler}
            onBlur={driverInputTouchHandler}
            value={driverInputValue}
          />
        </div>
        {/* Display error message for driver */}
        {driverInputHasError && <p>Driver initials should be three capital letters</p>}
        {/* Time input */}
        <div className={timeInputClassList}>
          <label htmlFor='timeInput'>Time:</label>
          <input
            type='text'
            id='timeInput'
            onChange={timeInputChangeHandler}
            onBlur={timeInputTouchHandler}
            value={timeInputValue}
          />
        </div>
        {/* Display error message for time */}
        {timeInputHasError && <p>Time should be in one of the following formats - Minutes: 1:23.456 or Seconds: '83.456'</p>}
        {/* Car input */}
        <div className={carInputClassList}>
          <label htmlFor='carInput'>Car:</label>
          <input
            type='text'
            id='carInput'
            onChange={carInputChangeHandler}
            onBlur={carInputTouchHandler}
            value={carInputValue}
          />
        </div>
        {/* Display error message for game */}
        {gameInputHasError && <p>This should just be a string</p>}
      </div>
      <div className={classes['form-actions']}>
        <button disabled={!formIsValid}>Submit</button>
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