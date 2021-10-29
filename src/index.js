import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));






// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();




// import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import "./assets/style.css";
// import surveyService from "./surveyService";

// class PreeoSurvey extends Component {

//   state = {
//     questions: []
//   };

//   getQuestions = () => {
//     surveyService().then(question => {
//       this.setState({
//         questions: question
//       });
//     });
//   };

//   componentDidMount() {
//     this.getQuestions();  
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="title">Preeo Survey</div>
//         { this.state.questions.length > 0 &&
//           this.state.questions.map(
//             ({ question, answers, questionId }) => <h4>{ question }</h4>
//           ) }
//       </div>
//     )
//   }

// }

// ReactDOM.render(PreeoSurvey, document.getElementById('root'))




// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import './index.css';
// // import App from './App';
// // import reportWebVitals from './reportWebVitals';

// // ReactDOM.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
