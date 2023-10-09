import {useEffect, useState} from "react";
import './question.css';

export default function Question({question, handleAnswerOnClick, selectedAnswer1}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    function handleOptionClick(index, isCorrect) {
        setSelectedAnswer(index);
        handleAnswerOnClick(isCorrect)
    }

    useEffect(()=> {
        console.log("useEffect gets called", selectedAnswer1);
        console.log("question", question);
        if(!selectedAnswer1) {
            setSelectedAnswer(null);
        }
    }, [selectedAnswer1, question])

    console.log("selected Answer", selectedAnswer);

    return (
        <div className={"question"}>
            <h2>{question.questionText}</h2>
            <form>
                {question.options.map((option, index) => (
                    <label key={index} className={"radio-label"}>
                    <input
                        type={"radio"}
                        name={`question-${question.id}-answer`}
                        value={option.answerText}
                        checked={selectedAnswer === index}
                        onChange={() => handleOptionClick(index, option.isCorrect)}
                    />
                        {option.answerText}
                    </label>
                ))}
            </form>
            {selectedAnswer !== null && (
                <p>{question.options[selectedAnswer].isCorrect ? 'Correct' : "Wrong"}</p>
            )}
        </div>
    )
}