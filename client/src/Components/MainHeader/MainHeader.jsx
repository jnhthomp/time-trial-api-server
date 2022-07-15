import React from 'react'
import classes from './MainHeader.module.css'

const MainHeader = () => {
  return (
    <header className={classes['main-header']}>
      <ul>
        <li className={classes.headerHide}></li>{/* new; invisible spacer item */}
        <li>Time Trials App</li>
        <li className={classes.headerBtn}>D</li>
      </ul>
    </header>
  )
}

export default MainHeader