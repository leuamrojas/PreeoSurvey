import React from 'react'
import PropTypes from 'prop-types'

function AnswerOptionText(props) {

    function getStyle(noLabel) {
        if (noLabel) 
          return  { display: 'none' }        
    }

    return (
        <div>
            <label className="customLabel" htmlFor={props.name} style={getStyle(!props.label)}>{props.label}</label>
            <input type="text" id={props.name} name={props.name} value={props.value} onChange={props.onChange}/>
        </div>
    )
}

AnswerOptionText.propTypes = {
    name: PropTypes.string.isRequired,    
    onChange: PropTypes.func.isRequired
  };

export default AnswerOptionText
