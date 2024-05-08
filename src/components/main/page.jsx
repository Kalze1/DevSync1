import React, { useState } from 'react';


const questionsData = {
    JavaScript: [
      {
        question:
          'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
        choices: ["USA", "Germany", "Spain", "United Kingdom"],
        correctAnswerIndex: 0,
      },
      {
        question:
          'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
        choices: ["USA", "Germany", "Spain", "United Kingdom"],
        correctAnswerIndex: 0,
      },
      // Add more JavaScript questions here
    ],
    Python: [
      {
        question:
          "What data type is used to store a single character in Python?",
        choices: ["int", "float", "string", "char"], // Optionally add incorrect choices
        correctAnswerIndex: 2, // Index of the correct answer
      },
      {
        question:
          "What data type is used to store a single character in Python?",
        choices: ["int", "float", "string", "char"], // Optionally add incorrect choices
        correctAnswerIndex: 2, // Index of the correct answer
      },

      // Add Python questions here
    ],
    Java: [
      {
        question:
          'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
        choices: ["USA", "Germany", "Spain", "United Kingdom"],
        correctAnswerIndex: 0,
      },
      {
        question:
          'This radio element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a href="https://tailwindui.com/">Tailwind UI</a> documentation.',
        choices: ["USA", "Germany", "Spain", "United Kingdom"],
        correctAnswerIndex: 0,
      },
      // Add more JavaScript questions here
    ],
    Rubi: [
      {
        question:
          "What data type is used to store a single character in Python?",
        choices: ["int", "float", "string", "char"], // Optionally add incorrect choices
        correctAnswerIndex: 2, // Index of the correct answer
      },
      {
        question:
          "What data type is used to store a single character in Python?",
        choices: ["int", "float", "string", "char"], // Optionally add incorrect choices
        correctAnswerIndex: 2, // Index of the correct answer
      },
    ]
  };

const questions = Object.values(questionsData).flat(); // Combine questions from all languages into a single array

const QuizComponent = () => {

  const [selectedLanguage, setSelectedLanguage] = useState(""); // State for selected language (if applicable)
  const [currentQuestion, setCurrentQuestion] = useState(0); // State for current question index
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null) // Array to store selected answers for each question
  );
  const [score, setScore] = useState(0); // State for score
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility (added)
  const programmingLanguages = Object.keys(questionsData); // Added language options

  // Implement these functions (replace with actual logic):
  const toggleDropdown = () => setIsOpen(!isOpen); // Toggle dropdown visibility

  const handleAnswerClick = (i) => {
    // Consider adding checks for invalid question index or user selecting before a question is displayed
    setSelectedAnswers((prevAnswers) => [...prevAnswers.slice(0, i), i, ...prevAnswers.slice(i + 1)]); // Update selected answer for current question
  };

  // ... other functions ...

  const filteredQuestions = selectedLanguage
    ? questions.filter((question) => question.language === selectedLanguage)
    : [];
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
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswers((prevAnswers) => [...prevAnswers]); // Keep previous answers on next question
    }
  };


 

  return (
    <div className="quiz-container mx-auto max-w-xl p-4 bg-gray-200 rounded-md shadow-md">
      <div className="dropdown relative"> {/* Added "relative" for positioning */}
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {selectedLanguage || "Select a Programming Language"} {/* Display selected language or default text */}
        </div>
        {isOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 absolute top-full left-0"
          >
            {programmingLanguages.map((language) => (
              <li key={language}>
                <a className="text-gray-700 hover:text-blue-500" onClick={() => handleLanguageClick(language)}>
                  {language}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      { selectedLanguage && ( 
        <>
        {/* Language Selection (if applicable) */}
        {/* ... your language selection component ... */}
      
        {filteredQuestions.length > 0 ? ( // Check if questions exist for the language
          <>
            <div className="question-container">
              <h2 className="text-xl font-medium mb-4">
                Question {currentQuestion + 1}
              </h2>
              <fieldset className="mb-5 mt-10">
                {questions[currentQuestion] && (
                  <div key={currentQuestion}>
                    <p className="text-base font-medium text-gray-900">
                      {questions[currentQuestion].question}
                    </p>
                    <ul className="list-none">
                      {/* Render answer choices (replace with your logic) */}
                      {questions[currentQuestion].choices?.map((choice, i) => (
                        <li key={i} className="flex items-center mb-4">
                          <input
                            type="radio" // Replace with appropriate input type (radio/checkbox)
                            name="question-choice" // Group radio buttons
                            value={i}
                            checked={selectedAnswers[currentQuestion] === i} // Use current question's answer
                            onChange={() => handleAnswerClick(i)}
                          />
                          <label
                            htmlFor={`country-option-${i + 1}`}
                            className="text-sm font-medium text-gray-900 ml-2 block"
                          >
                            {choice}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </fieldset>
            </div>

            <div className="button-container flex justify-between mt-4">
            <button
              className="py-2 px-4 bg-gray-200 text-gray-500 mr-3 rounded-md hover:bg-gray-300 disabled:opacity-50 "
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous
            </button>
              {currentQuestion === filteredQuestions.length - 1 ? ( // Check for last question
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-not-allowed"
                  onClick={handleAnswerSubmit}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-not-allowed"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>

            {/* Show progress bar only if not on the last question and haven't submitted */}
            {currentQuestion < filteredQuestions.length - 1 && score === 0 && (
              <div className="progress mt-4">
                <div
                  className="progress-bar bg-blue-500 h-2 rounded-full"
                  role="progressbar"
                  style={{ width: `${progressValue * 100}%` }}
                  aria-valuenow={progressValue}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center mt-4">No questions available in {selectedLanguage} yet.</p>
        )}
      </> 
      ) }
      { score > 0 && filteredQuestions.length > 0 && (
          <div className="result-container mt-4">
          <p className="text-center text-xl font-medium mb-2">Congratulations! You scored {score} out of {filteredQuestions.length} questions.</p>
          <div className="progress">
            <div
              className="progress-bar bg-green-500 h-2 rounded-full"
              role="progressbar"
              style={{ width: `${(score / filteredQuestions.length) * 100}%` }}
              aria-valuenow={score}
              aria-valuemin="0"
              aria-valuemax={filteredQuestions.length}
            ></div>
          </div>
        </div> 
      
      )}

    </div>
  );
};

export default QuizComponent;
