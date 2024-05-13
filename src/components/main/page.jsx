import React, { useState } from 'react';

const QuizComponent = () => {
  const questionsD = [
    {
      "language": "JavaScript",
      "category": "Basics", // Added category property
      "question": ["What data type is used to store a single character in JavaScript?","What method is used to select elements by ID in JavaScript?"],
      "choices": [["int", "float", "string", "char"],["float", "string","int" ,"char"]],
      "correctAnswerIndex": [2,3],
      "explanation": "The 'string' data type is used to store text data, including single characters." // Added explanation property
    },
    {
      "language": "Python",
      "category": "Functions",
      "question": ["How do you define a function in Python?","What method is used to select elements by ID in JavaScript?"],
      "choices": [["def function_name():", "func = function_name()", "function function_name{}", "None of the above"],
                  ["def function_name():", "func = function_name()", "function function_name{}", "None of the above"] ],
      "correctAnswerIndex": [2,3]
    },
    {
      "language": "Java",
      "category": "Loops",
      "question": ["What is the syntax for a 'for' loop in Java?","What method is used to select elements by ID in JavaScript?"],
      "choices": [
       [ "for (int i = 0; i < n; i++) { ... }",
        "while (i < n) { ... }",
        "do { ... } while (i < n)",
        "None of the above"],
        ["def function_name():", "func = function_name()", "function function_name{}", "None of the above"]
      ],
      "correctAnswerIndex": [2,3],
      "hint": "The syntax includes an initialization statement, a condition, and an increment/decrement expression." // Added hint property
    },
    {
      "language": "Ruby",
      "category": "Arrays",
      "question": ["How do you access the first element of an array in Ruby?","What method is used to select elements by ID in JavaScript?"],
      "choices": [["array[0]", "array.first", "array.head", "None of the above"],
                  ["def function_name():", "func = function_name()", "function function_name{}", "None of the above"]],
      "correctAnswerIndex": [2,3]
    }
  ]


  // State variables
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const programmingLanguages = ["JavaScript", "Python", "Java", "Ruby"];

  // Functions
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAnswerClick = (index) => {
    // Consider adding checks for invalid question index or user selecting before a question is displayed
    setSelectedAnswer(index);
  };

  const filteredQuestions = selectedLanguage
    ? questionsD.filter((question) => question.language === selectedLanguage)
    : [];

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      if (filteredQuestions.length > 0 && currentQuestion < filteredQuestions.length) {
        const question = filteredQuestions[currentQuestion];
        const isCorrect = selectedAnswer === question.correctAnswerIndex[currentQuestion];
        setScore(isCorrect ? score + 1 : score); // Update score based on correct answer

        const selectedChoice = question.choices[selectedAnswer];
        const correctChoiceIndex = question.correctAnswerIndex[currentQuestion];
        const isCorrectChoice = selectedAnswer === correctChoiceIndex;
        setShowAnswer(true); // Set state to show answer
      } else {
        console.error("Error: No questions found or invalid currentQuestion");
        console.log(score);
      }

      setSelectedAnswer(null); // Reset selected answer
    } else {
      alert('Please select an answer.');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer
    }
  };

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="quiz-container mx-auto max-w-2xl p-4">
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
          { filteredQuestions.length > 0 ? (
            <> 
              <div className="question-container" >
                <h2 className="text-xl font-medium mb-4">
                    Question {currentQuestion + 1}
                </h2>
                <fieldset className="mb-5 mt-10">
                    {/* Map through filtered questions and render choices with radio buttons */}
                    {filteredQuestions.map((question, questionIndex) => {
                      if (question.choices && question.choices[currentQuestion]) {
                        return (
                          <div key={questionIndex}>
                            <div className="text-base font-medium text-gray-900 mb-5">
                              {question.question[currentQuestion]}
                            </div>
                            <ul className="list-none">
                              {question.choices[currentQuestion].map((choice, i) => (
                                <li key={i} className="flex items-center mb-4">
                                  <input
                                    id={`question-option-${i + 1}`}
                                    type="radio"
                                    name="choices" // Group radio buttons by question
                                    value={i}
                                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                    aria-labelledby={`question-option-${i + 1}`}
                                    aria-describedby={`question-option-${i + 1}`}
                                    checked={selectedAnswer === i} // Check radio button based on selectedAnswer state
                                    onChange={() => setSelectedAnswer(i)} // Update selectedAnswer on change
                                  />
                                  <label
                                    htmlFor={`question-option-${i + 1}`}
                                    className="text-sm font-medium text-gray-900 ml-2 block"
                                  >
                                    {choice}
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                    })}
                </fieldset>
                
                <div className="button-container flex justify-between mt-4">
                  {/* Previous button (disabled on first question) */}
                  <button
                    className="py-2 px-4 bg-gray-200 text-gray-500 mr-3 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  >
                    Previous
                  </button>

                  {/* Submit or next question button based on current question index */}
                  {currentQuestion === filteredQuestions.length - 1 ? (
                    <button
                      className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      onClick={handleAnswerSubmit}
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      onClick={handleNextQuestion}
                    >
                      Next Question
                    </button>
                  )}
                </div>

                {showAnswer && (
                  <div className="answer-container mt-10">
                    <h3 className="text-xl font-medium mb-2">Correct Answer</h3>
                    <p className="text-base font-medium text-gray-900 mb-4">
                      {filteredQuestions[currentQuestion].choices[filteredQuestions[currentQuestion].correctAnswerIndex[currentQuestion]]}
                    </p>

                    <h3 className="text-xl font-medium mb-2">Explanation</h3>
                    <p className="text-base text-gray-700">
                      {filteredQuestions[currentQuestion].explanation[currentQuestion]}
                    </p>
                  </div>
                )} 
              </div>
            </>
          ) : (
            <p className="text-center mt-4">No questions available in {selectedLanguage} yet.</p>
          ) }
        </> 
        )
      }
    </div>
  )
}
