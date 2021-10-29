import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import AnswerOption from '../components/AnswerOption';

function Survey(props) {

    return (
        <div>
            <Question className="question" content={props.question} />
            <AnswerOption 
                answer={props.answer}
                answerOptions={props.answerOptions}                 
                currentQuestionIndex={props.currentQuestionIndex}    
                questionName={props.questionName}
                onAnswerSelected={props.onAnswerSelected}            
                />
        </div>
    );
  }
  
  Survey.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    currentQuestionIndex: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired, 
    questionName: PropTypes.string.isRequired, 
    onAnswerSelected: PropTypes.func.isRequired
  };
  
  export default Survey;