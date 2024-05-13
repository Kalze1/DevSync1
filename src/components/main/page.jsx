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
    },
    // {
    //   "language": "JavaScript",
    //   "category": "DOM Manipulation",
    //   "question": "What method is used to select elements by ID in JavaScript?",
    //   "choices": ["getElementById", "querySelector", "getElementsByClass", "None of the above"],
    //   "correctAnswerIndex": 0
    // }
  ]

  // const questions = Object.values(questionsD).flat(); // Combine questions from all languages into a single array
  const [selectedLanguage, setSelectedLanguage] = useState(""); // State for selected language (if applicable)
  const [currentQuestion, setCurrentQuestion] = useState(0); // State for current question index
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer (optional)
  const [showAnswer, setShowAnswer] = useState(false); // Flag to display answer

  const [score, setScore] = useState(0); // State for score
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility (added)
  const programmingLanguages = ["JavaScript","Python","Java","Ruby"]; // Added language options

  // Implement these functions (replace with actual logic):
  const toggleDropdown = () => setIsOpen(!isOpen); // Toggle dropdown visibility

  const handleAnswerClick = (choiceIndex) => {
    // Consider adding checks for invalid question index or user selecting before a question is displayed
    setSelectedAnswer(choiceIndex);
    console.log(selectedAnswer);
    };


  const filteredQuestions = selectedLanguage ? questionsD.filter( (questionsD) => questionsD.language === selectedLanguage) : [];

  
  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === filteredQuestions[currentQuestion].correctAnswerIndex[currentQuestion];
      setScore(isCorrect ? score + 1 : score); // Update score based on correct answer
      setShowAnswer(true); // Show answer after submission
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer
      // alert({score})
    } else {
      alert('Please select an answer.');
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset s+elected answer
    }
  };

  const handleLanguageClick = (language) => {
    setSelectedLanguage((prevSelectedLanguage) => {
      return language;
    });
    setCurrentQuestion(0);
    // console.log(selectedLanguage);
    setSelectedAnswer(null);
    setIsOpen(false); // Close dropdown after selection
  };
  const progressValue = currentQuestion / (filteredQuestions.length - 1);
  const attemptedQuestions = currentQuestion -1 ; // Calculate attempted questions

  return (
    <div className="quiz-container mx-auto max-w-2xl p-4">
      <div className="dropdown "> {/* Added "relative" for positioning */}
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          { selectedLanguage || "Select a Programming Language"} {/* Display selected language or default text */}
        </div>
        { isOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 absolute top-full left-0"
          >
            { programmingLanguages.map((language) => (
              <li key={language}>
                <a className="text-gray-700 hover:text-blue-500" onClick={() => handleLanguageClick(language)}>
                  {language}
                </a>
              </li>
            ))}
          </ul>
        )}


      </div>
      {/* {console.log(filteredQuestions)} */}
      { selectedLanguage && ( 
      <>
        {filteredQuestions.length > 0 ? ( 
          <>
            <div className="question-container">
              <h2 className="text-xl font-medium mb-4">
                Question {currentQuestion + 1}
              </h2>
              <fieldset className="mb-5 mt-10">
               {
                questionsD.map((question) => {
                  if(question.language === selectedLanguage){
                    return (
                      <div >
                        <div className="text-base font-medium text-gray-900 mb-5">
                           {question.question[currentQuestion]} 
                           </div>
                         <ul className="list-none">
                          {question.choices[currentQuestion].map((choice, choiceIndex) => (
                            <li key={choiceIndex} className="flex items-center mb-4">
                              <input
                                id={`question-option-${choiceIndex + 1}`}
                                type="radio"
                                name={`question-${currentQuestion}`} // Group radio buttons by question
                                value={choiceIndex}
                                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                aria-labelledby={`question-option-${choiceIndex + 1}`}
                                aria-describedby={`question-option-${choiceIndex + 1}`}
                                // (Optional) Add logic to handle selected answer (e.g., checked={selectedAnswer === choiceIndex})
                                onChange={() => handleAnswerClick(choiceIndex)} // Pass correct index
                              />
                              <label
                                htmlFor={`question-option-${choiceIndex + 1}`}
                                className="text-sm font-medium text-gray-900 ml-2 block"
                              >
                                {choice}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
             
                    )
                  }
                })
               }
              </fieldset>
            </div>
          {/* {console.log("filteredQuestions:", filteredQuestions)}  */}
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
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 "
                  onClick={handleAnswerSubmit}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 "
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
            {/* Show progress bar only if not on the last question and haven't submitted */}
            { currentQuestion < filteredQuestions.length - 1 && score === 0 && (
            <div className="progress-container mb-5" >
              <div
                className="radial-progress mt-5" // Update class name if needed
                style={{ "--value": `${(attemptedQuestions / filteredQuestions.length) * 100}` }} // Update calculation
                role="progressbar"
                aria-valuenow={attemptedQuestions} // Update aria-valuenow
              >
                {attemptedQuestions}/{filteredQuestions.length}
              </div>
            </div> 
          )}
          </>
        ) : (
          <p className="text-center mt-4">No questions available in {selectedLanguage} yet.</p>
        )}
      </> 
      ) }
     

    </div>
  );
};

export default QuizComponent;
