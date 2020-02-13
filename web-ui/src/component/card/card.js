import React from 'react'

const card = props => {
  return (
    <div
      className={`card${props.noPad ? ` ${'p-none'}` : ''}${
        props.vertical ? ` ${'flex-d-col'}` : ''
      }${props.expand ? ` ${'card-expand'}` : ''}${
        props.className ? ` ${props.className}` : ''
      }`}
    >
      {props.children}
    </div>
  )
}

export default card
