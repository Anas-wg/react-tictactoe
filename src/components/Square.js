import React from 'react';
import "./Square.css"

export default function Square({onClick, value}) {
  return(
    <button className='square'
      onClick={onClick} // 클릭시 handleClick 함수(props: onClick) 호출
    >
      {value}
    </button>
  )
}
 