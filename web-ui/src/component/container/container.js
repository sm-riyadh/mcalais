import React from 'react'

const container = props => {
  return (
    <div
      className={`container${props.pos ? ` flex-pos-to-${props.pos}` : ''}${
        props.noPad ? ` noPad` : ''
      }${props.vPos ? ` flex-vpos-to-${props.vPos}` : ''}${
        props.vertical ? ` flex-d-col` : ''
      }${props.className ? ` ${props.className}` : ''}`}
    >
      {props.children}
    </div>
  )
}

export default container
