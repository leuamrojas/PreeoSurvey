import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
    return (

        <CSSTransitionGroup
            className="container result"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div>
                <h1 className="question">Thanks for taking the survey!</h1> 
                {/* <img src={resultImg} width="100%" height="100%" alt="Thanks for your feedback"></img> */}
                <div className="question">Adolescents: {props.adolescents}</div>
                <div className="question">Unlicensed: {props.unlicensed}</div>
                <div className="question">First Timers: {props.first_timers}</div>
                <div className="question">Targetables: {props.targetables}</div>
                <div className="question">Age less than 18: {props.percentAge18Less}%</div>
                <div className="question">Age from 18 to 25: {props.percentAge18to25}%</div>
                <div className="question">Age more than 25: {props.percentAge25More}%</div>
                <div className="question">Targetables that care about fuel emissions: {props.percentTargetables1}%</div>
                <div className="question">Targetables that picked FWD or “I don’t know” for drivetrain: {props.percentTargetables2}%</div>
                <div className="question">Average amount of cars in a family: {props.avgCarsFamily}%</div>
            </div>
        </CSSTransitionGroup>
    )
}

export default Result
