import React, { useState, useEffect } from 'react';

const DynamicQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0); // Track user's score
  const [showAnswer, setShowAnswer] = useState(false); // Flag to display answer

  const questionsData = [
    {
      question: 'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
      choices: ['USA', 'Germany', 'Spain', 'United Kingdom'],
      correctAnswerIndex: 1,
    },
    {
      question: 'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
      choices: ['USA', 'Germany', 'Spain', 'United Kingdom'],
      correctAnswerIndex: 0,
    },
    {
      question: 'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
      choices: ['USA', 'Germany', 'Spain', 'United Kingdom'],
      correctAnswerIndex: 2,
    },
    {
      question: 'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
      choices: ['USA', 'Germany', 'Spain', 'United Kingdom'],
      correctAnswerIndex: 3,
    },
    // Add more questions here in the same format
  ];

  useEffect(() => {
    setQuestions(questionsData); // Set initial questions
  }, []);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswerIndex;
      setScore(isCorrect ? score + 1 : score); // Update score based on correct answer
      // setShowAnswer(true); // Show answer after submission
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer
      // alert({score})
    } else {
      alert('Please select an answer.');
    }
  };
  
  const attemptedQuestions = currentQuestion ; // Calculate attempted questions

  return (
    <div className=" max-w-md p-4  rounded-md shadow-md">
      <h2 className="text-xl font-medium mb-4">Question {currentQuestion + 1}</h2>
      <fieldset className="mb-5 mt-10">
        <legend className="text-base font-medium text-gray-900 mb-5" > {questions[currentQuestion]?.question}</legend>
        <ul className="list-none">
            
          {questions[currentQuestion]?.choices?.map((choice, i) => (
            <li key={i} className="flex items-center mb-4">
              <input
                id={`country-option-${i + 1}`}
                type="radio"
                name="countries"
                value={choice}
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                aria-labelledby={`country-option-${i + 1}`}
                aria-describedby={`country-option-${i + 1}`}
                checked={selectedAnswer === i}
                onChange={() => handleAnswerClick(i)}
              />
              <label htmlFor={`country-option-${i + 1}`} className="text-sm font-medium text-gray-900 ml-2 block">
                {choice}
              </label>
              
            </li>
          ))}
          
        </ul>
      
      </fieldset>
      <div className="progress-container">
            <div
              className="radial-progress" // Update class name if needed
              style={{ "--value": `${(attemptedQuestions / questions.length) * 100}` }} // Update calculation
              role="progressbar"
              aria-valuenow={attemptedQuestions} // Update aria-valuenow
            >
              {attemptedQuestions}/{questions.length}
            </div>
          </div>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-700"
        onClick={handleAnswerSubmit}// Disable button on last question
      >
        {currentQuestion === questions.length ? 'Complete Quiz' : 'Next Question'}
      </button>
      
      {currentQuestion === questions.length && ( // Display score on completion
      <p className="mt-4 text-center">Congratulations! You scored {score} out of {questions.length} questions.</p>
    
    )}
    </div>
  );
};

export default DynamicQuiz;
