import React from 'react'

// Criando componente box
export const Box = (props) => {
    return (
        <button className="board__box" onClick={props.onClick}>
            {props.value}
        </button>
    )
}