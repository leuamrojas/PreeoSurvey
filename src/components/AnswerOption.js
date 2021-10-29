import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerOptionRadio from './AnswerOptionRadio'
import {FormErrors} from './FormErrors'
import AnswerOptionDropdown from './AnswerOptionDropdown';
import AnswerOptionText from './AnswerOptionText';
import AnswerOptionNumber from './AnswerOptionNumber';

export class AnswerOption extends Component {

    currentTarget = null;

    constructor(props) {
        super(props)
        this.state = {
            answerSelected: '',
            age: '',
            gender: '',
            hasLicense: '',
            isFirstCar: '',
            drivetrain: '',
            fuelEmissions: '',
            carCount: '',
            make: '',
            model: '',
            formErrors: {age: '', hasLicense: '', isFirstCar: '', drivetrain: '', fuelEmissions: '', carCount: '', model: ''},
            formValid: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = (e) => {
        if (this.currentTarget && this.currentTarget.type === "radio") {
            this.currentTarget.checked = false;
        }
        let answerSelected = this.state.answerSelected;
        if (this.currentTarget.name === 'make' || this.currentTarget.name === 'model' ) {            
            answerSelected = this.state.make + "-" + this.state.model;
        }
        this.props.onAnswerSelected(answerSelected, !this.validateRules(this.props.questionName));
        this.setState({formValid: false});
    }

    validateRules(fieldName) {        
        switch(fieldName) {
            case 'age': return (this.state.age < 18);             
            case 'hasLicense': return (this.state.hasLicense.includes("No") || this.state.age > 25);
            case 'isFirstCar': return this.state.isFirstCar === "Yes";            
            default: return false;                
        }        
    }

    onChange = (e) => { 
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({ answerSelected: value})     
        this.setState({ [name]: value }, 
                        () => { this.validateField(name, value) });
        this.currentTarget = e.target;
    }
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fieldValid = this.state.fieldValid;
        this.resetFieldValidationErrors();
        switch(fieldName) {
            case 'age': 
                fieldValid = value!=='' && value>=0 && value<=100;
                fieldValidationErrors.age = fieldValid ? '' : ' must be between 0 and 100';                
                this.setState({formValid: fieldValid});
                break;
            case 'gender':                           
            case 'hasLicense':
            case 'isFirstCar':              
            case 'drivetrain':               
            case 'fuelEmissions':
                fieldValid = value!=='';
                break;
            case 'carCount': 
                fieldValid = value!=='' && value>=0 && value<=100
                fieldValidationErrors.carCount = fieldValid ? '' : ' must be between 0 and 100';                
                break;
            case 'make': 
                fieldValid = this.validateMakeModel(fieldValidationErrors)
                break;
            case 'model': 
                fieldValid = this.validateMakeModel(fieldValidationErrors)
                break;
            default:
                break;
        }
        this.setState({formValid: fieldValid});
    }

    validateMakeModel(fieldValidationErrors) {
        let fieldValid = true;
        fieldValidationErrors.model = '';     
        if (this.state.make === "BMW") {
            let pattern1 = new RegExp(/^M?[0-9][0-9][0-9](d|i)?$/);
            let pattern2 = new RegExp(/^(X|Z)[0-9]{1}$/);
            fieldValid = pattern1.test(this.state.model) || pattern2.test(this.state.model)                        
            fieldValidationErrors.model = fieldValid ? '' : ' is not valid for make BMW'
        } 
        return this.state.make && this.state.model && fieldValid;
    }

    resetFieldValidationErrors() {  
        let fieldValidationErrors = this.state.formErrors;      
        fieldValidationErrors.age = '';
        fieldValidationErrors.hasLicense = '';
        fieldValidationErrors.isFirstCar = '';
        fieldValidationErrors.drivetrain = '';
        fieldValidationErrors.fuelEmissions = '';
        fieldValidationErrors.carCount = '';
        fieldValidationErrors.model = '';
    }

    renderAnswerOptionDropdown(label) {       
        return (
            <AnswerOptionDropdown
                ddLabel={label}
                questionName={this.props.questionName}
                answerOptions={this.props.answerOptions}
                onChange={this.onChange}
            />
        )
    }

    renderAnswerOptionText(name, value, label) {       
        return (
            <AnswerOptionText
                name={name}                
                label={label}   
                value={value}             
                onChange={this.onChange}
            />
        )
    }

    renderAnswerOptionNumber(name, value, label) {       
        return (
            <AnswerOptionNumber
                name={name}
                label={label}
                value={value}  
                onChange={this.onChange}
            />
        )
    }

    renderAnswerOptionRadio() {
        return (
            <ul className="answerOptions">
                {this.props.answerOptions.map( (option, index) => 
                    <AnswerOptionRadio
                        key={index}
                        answerContent={option}
                        answerDefault={this.props.answerOptions[0]}                               
                        questionName={this.props.questionName}
                        onAnswerChanged={this.onChange}    
                    /> 
                )}                        
            </ul>            
        );
    }
        
    renderAnswerOptions() {
        const questionIndex = this.props.currentQuestionIndex;
        const questionName = this.props.questionName;
        if (questionIndex === 0){
            return (                
                this.renderAnswerOptionNumber(questionName, this.state.age)
            )
        } else if (questionIndex === 1) {            
            this.answer = this.props.answerOptions[0];
            return (                
                this.renderAnswerOptionDropdown()
            )
        } else if (questionIndex === 6) {            
            return (
                this.renderAnswerOptionNumber(questionName, this.state.carCount)
            )
        } else if (questionIndex === 7) {
            this.answer = this.props.answerOptions[0];
            return (
                <div>
                    {this.renderAnswerOptionDropdown("Make:")}
                    {this.renderAnswerOptionText('model', this.state.model, 'Model:')}
                </div>
            )
        } else { 
            return (
                this.renderAnswerOptionRadio()
            );
        }
    }   

    render() {        
        return (
            <div className="question">
                {this.renderAnswerOptions()}
                {this.state.formErrors && <div className="customError"><FormErrors formErrors={this.state.formErrors} /></div>}
                <div className="controls">
                    <button className="btnSubmit" onClick={this.onSubmit} disabled={!this.state.formValid}>Submit</button>    
                </div>
            </div>                
        )
    }
}

export default AnswerOption;

AnswerOption.propTypes = {
  answer: PropTypes.string.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  answerOptions: PropTypes.array.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};