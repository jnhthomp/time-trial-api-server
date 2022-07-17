import React from 'react'
import classes from './MainHeader.module.css'

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <ul>
        <li className={classes.headerHide}></li>{/* new; invisible spacer item */}
        <li onClick={props.titleClick}>Time Trials App</li>
        <li className={classes.headerBtn} onClick={props.showForm}>Add Time</li>
      </ul>
    </header>
  )
}

export default MainHeader