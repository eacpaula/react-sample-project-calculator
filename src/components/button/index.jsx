import React from "react";
import './index.css'

export default props => {
    return (
        <button 
            className={`
                btn 
                ${props.operation ? 'operation' : ''}
                ${props.cols ? `col-${props.cols}` : ''}
            `}
            onClick={e => props.click && props.click(props.value)}
        >
            {props.value}
        </button>
    )
}
