import React from 'react'
import PropTypes from 'prop-types'

function AnswerOptionNumber(props) {

    function getStyle(noLabel) {
        if (noLabel) 
          return  { display: 'none' }        
    }

    return (
        <div>
            <label className="customLabel" htmlFor={props.name} style={getStyle(!props.label)}>{props.label}</label>
            <input type="number" id={props.name} name={props.name} value={props.value} min="0" max="100" onChange={props.onChange} />
        </div>
    )
}

AnswerOptionNumber.propTypes = {
    name: PropTypes.string.isRequired,    
    onChange: PropTypes.func.isRequired
}

export default AnswerOptionNumber

