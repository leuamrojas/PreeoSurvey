import React from 'react';
import PropTypes from 'prop-types';

function AnswerOptionRadio(props) {
  return (    
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name={props.questionName}
        id={props.answerContent}
        value={props.answerContent}        
        onChange={props.onAnswerChanged}        
      />
      <label className="radioCustomLabel" htmlFor={props.answerContent}>
        {props.answerContent}
      </label>
    </li>
  );
}

AnswerOptionRadio.propTypes = {  
  questionName: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,  
  onAnswerChanged: PropTypes.func.isRequired
};

export default AnswerOptionRadio;