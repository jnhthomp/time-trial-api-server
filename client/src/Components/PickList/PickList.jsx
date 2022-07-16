import React from 'react'

const PickList = (props) => {
  // console.log(props.list)
  
  const selectListItem = (itemName, itemType) => {
    props.fetchListItem(itemName, itemType)
  }
  const items = props.list.data.map((item, index) => { 
    return (
      <li key={`${index}-${item.name}`}>{item.name} <button onClick={() => selectListItem(item.name, props.list.type)}>Select</button></li>
    )
  })

  return (
    <ul>
      {items}
    </ul>
  )
}

export default PickList