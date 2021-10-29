import React, { Component } from 'react'
import surveyQuestions from './api/surveyQuestions'
import logo from './logo.svg';
import './App.css';
import Survey from './components/Survey';
import Result from './components/Result';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      questionName: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      showResult: false,      
      adolescents: 0,
      unlicensed: 0,
      first_timers: 0,        
      targetables: 0,
      from18to25: 0,
      moreThan25: 0,
      percentTargetables1: 0,
      percentTargetables2: 0,
      avgCarsFamily: 0,
      makeModelCount: {},
      surveyAnswers: localStorage.getItem("surveyAnswers") ? JSON.parse( localStorage.getItem("surveyAnswers")) : [] 
    }

     this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {    
    this.setState({
      question: surveyQuestions[0].question,
      questionName: surveyQuestions[0].questionName,
      answerOptions: surveyQuestions[0].answers      
    })
    this.setMakeModel();
    console.log("Avg: " + this.getPercentTargetablesDrivetrainFWDOrDN())
  }

  getCountAge(group) {
    let count;    
    switch (group) {     
      case 1: count = this.state.surveyAnswers.filter(item => item.age < 18).length;        
        break;      
      case 2: count = this.state.surveyAnswers.filter(item => item.age >= 18 && item.age <= 25).length;        
        break;    
      default: count = this.state.surveyAnswers.filter(item => item.age > 25).length;
        break;
    }
    return count;
  }

  getPercentAge(group) {
    return this.roundNumber(this.getCountAge(group)*100/this.state.surveyAnswers.length);
  }

  getCountUnlicensedDrivers() {
    return this.state.surveyAnswers.filter(item => item.hasLicense && item.hasLicense.includes("No")).length;
  }

  getCountFirstTimers() {
    return this.state.surveyAnswers.filter(
      item => item.age >= 18 && item.age <=25 && item.isFirstCar === 'Yes').length;
  }

  getCountTargetables() {
    return this.state.surveyAnswers.filter(item => Object.keys(item).length === 8).length;
  }

  getPercentTargetablesFuelEmissions() {
    return this.roundNumber(this.state.surveyAnswers.filter(
      item => Object.keys(item).length === 8 && item.fuelEmissions === "Yes").length * 100 / 8);
  }

  getPercentTargetablesDrivetrainFWDOrDN() {
    return (this.state.surveyAnswers.filter(
      item => Object.keys(item).length === 8 && 
      this.roundNumber(item.drivetrain === "RWD" || item.drivetrain.includes("know"))).length * 100 / 8);
  }

  getAverageAmountCars() {
    const targetables = this.state.surveyAnswers.filter(item => Object.keys(item).length === 8);
    const sumTargetables = targetables.map(item => parseInt(item.carCount))
      .reduce(function(accumulator, currentValue) {
        return accumulator + currentValue;
      });
    return this.roundNumber(sumTargetables/targetables.length);
  }

  roundNumber(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  handleAnswerSelected(answer, isTarget) {
    this.setUserAnswer(answer);
    if (isTarget) {
      if (this.state.questionId < surveyQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.getResults(), 300);
      }
    } else {
      setTimeout(() => this.getResults(), 300);
    }
  }  

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [state.questionName]: answer
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: surveyQuestions[counter].question,
      questionName: surveyQuestions[counter].questionName,
      answerOptions: surveyQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    
    this.setState((state) => ({
      surveyAnswers: [ ...state.surveyAnswers, state.answersCount]
    }),
      () => {
        this.setState({
          adolescents: this.getCountAge(1),
          unlicensed: this.getCountUnlicensedDrivers(),
          first_timers: this.getCountFirstTimers(),        
          targetables: this.getCountTargetables(),
          percentAge18Less: this.getPercentAge(1),
          percentAge18to25: this.getPercentAge(2),
          percentAge25More: this.getPercentAge(3),
          percentTargetables1: this.getPercentTargetablesFuelEmissions(),
          percentTargetables2: this.getPercentTargetablesDrivetrainFWDOrDN(),
          avgCarsFamily: this.getAverageAmountCars()
        },
          () => this.setState({ showResult: true })
        )
        localStorage.setItem("surveyAnswers", JSON.stringify(this.state.surveyAnswers))    
      }
    );  

    return true;
  }

  setMakeModel() {
    const targetables = this.state.surveyAnswers.filter(item => Object.keys(item).length === 8);
    targetables.forEach(item => {      
      const makeModel = item.make.toUpperCase();
      this.setState( (state) => ({
        makeModelCount: {
          ...state.makeModelCount,
          [makeModel]: (state.makeModelCount[makeModel] || 0) + 1
        }
      }));      
    })
  }

  renderResult() {
    return <Result
              surveyResult={this.state.result} 
              adolescents={this.state.adolescents}
              unlicensed={this.state.unlicensed}
              first_timers={this.state.first_timers}
              targetables={this.state.targetables}
              percentAge18Less={this.state.percentAge18Less}
              percentAge18to25={this.state.percentAge18to25}
              percentAge25More={this.state.percentAge25More}
              percentTargetables1={this.state.percentTargetables1}
              percentTargetables2={this.state.percentTargetables2}
              avgCarsFamily={this.state.avgCarsFamily}
            />;
  }

  renderSurvey() {
    return (
      <Survey
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionName={this.state.questionName}
        questionTotal={surveyQuestions.length}
        currentQuestionIndex={this.state.counter}
        onAnswerSelected={this.handleAnswerSelected}        
      />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Preeo Survey</h2>
        </div>  
        <div className="container">                  
          { this.state.showResult ?  this.renderResult() : this.renderSurvey() }        
        </div>  
      </div>
    );
  }
}

export default App;