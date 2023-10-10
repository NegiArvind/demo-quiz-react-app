import {useEffect, useState} from "react";
import Question from "./Question";
import './quiz.css';
const questions = require('./questionFixture.json')

export function QuizComponent(){
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [answerSelected, setAnswerSelected] = useState(false);
    const [currentQuestion, setCurrenQuestion] = useState(questions[currentQuestionNumber]);
    const [nextButtonClicked, setNextButtonClicked] = useState(false);


    function handleAnswerOnClick(isCorrect) {
        if(isCorrect) {
            setScore(score + 10)
        }
        setTimeLeft(15)
        setAnswerSelected(true);
    }

    function handleNextButtonClick() {
        setCurrenQuestion(questions[currentQuestionNumber + 1])
        setCurrentQuestionNumber(currentQuestionNumber + 1);
        setNextButtonClicked(true);
    }

    // useEffect(() => {
    //     if(nextButtonClicked) {
    //         setNextButtonClicked(false);
    //         setCurrenQuestion(questions[currentQuestionNumber]);
    //     }
    // }, [currentQuestionNumber, nextButtonClicked])

    useEffect(()=> {
        if(currentQuestionNumber < questions.length && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft-1)
            }, 1000)
            return () => clearTimeout(timer);
        } else if(currentQuestionNumber < questions.length) {
            setCurrentQuestionNumber(currentQuestionNumber + 1);
            setTimeLeft(15);
        } else {
            setShowSummary(true);
        }
    }, [currentQuestionNumber, timeLeft])


    return (
        <div className={"quiz"}>
            {!showSummary && (
                <div className={'quiz-header'}>
                    <p>Question {currentQuestionNumber + 1} of {questions.length}</p>
                    <div className={'progress-bar'}>
                        <div className={'progress'} style={{width: `${((currentQuestionNumber+1)/questions.length)*100}%`}}></div>
                    </div>
                    <p>Time Left: {timeLeft} seconds</p>
                </div>
            )}

            {currentQuestionNumber < questions.length ?
                (<Question
                    question={currentQuestion}
                    handleAnswerOnClick={handleAnswerOnClick}
                    selectedAnswer1={null}
                />
                ) : (
                    <div className={"summary"}>
                        <h2> Your score is: {score}/{questions.length * 10}</h2>
                        <button onClick={() => window.location.reload()}>Restart Quiz </button>
                    </div>
                )
            }
            {timeLeft > 0 && answerSelected && currentQuestionNumber < questions.length && (
                <div style={{marginTop: '18px'}}>
                    <button onClick={handleNextButtonClick}>Next</button>
                </div>
            )}
        </div>
    )
}