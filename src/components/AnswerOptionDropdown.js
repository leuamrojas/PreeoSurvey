import React from 'react';
import PropTypes from 'prop-types';

function AnswerOptionDropdown(props) {

  function getStyle(noLabel) {
    if (noLabel) 
      return  { display: 'none' }        
  }

  let optionItems = props.answerOptions.map((option) => 
    <option key={option} value={option}>{option}</option>        
  );
  return (
    <div>        
        <label className="customLabel" htmlFor={props.questionName} style={getStyle(!props.ddLabel)} >{props.ddLabel}</label>
        <select onChange={props.onChange} id={props.questionName} name={props.questionName}>
          <option key="Select one" value="">-- Select one --</option>
          {optionItems}
        </select>                                
    </div>
  )
}

AnswerOptionDropdown.propTypes = {
  questionName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AnswerOptionDropdown;