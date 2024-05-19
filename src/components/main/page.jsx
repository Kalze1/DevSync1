import React, { useState } from 'react';

const QuizComponent = () => {


  // State variables
  const [questionsD, setquestionsD] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const programmingLanguages = ["JavaScript", "Python", "Java", "Ruby"];

  
useEffect(() => {
  const fetchQuestions = async () => {
    

    try {
      const response = await axios.get('http://localhost:3001/api/quiz');
      setquestionsD(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("yesss");
    }
  };

  fetchQuestions();
}, []);
  // Helper functions
  const getCurrentQuestionData = () => {
    if (!selectedLanguage) return null;
    const filteredQuestions = questionsD.filter((question) => question.language === selectedLanguage);
    if (filteredQuestions.length === 0) return null;
    return filteredQuestions[0];
  };

  const getCurrentQuestion = () => {
    const questionData = getCurrentQuestionData();
    return questionData ? questionData.question[currentQuestion] : null;
  };

  const getCurrentChoices = () => {
    const questionData = getCurrentQuestionData();
    return questionData ? questionData.choices[currentQuestion] : [];
  };

  const getCorrectAnswerIndex = () => {
    const questionData = getCurrentQuestionData();
    return questionData ? questionData.correctAnswerIndex[currentQuestion] : -1;
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === getCorrectAnswerIndex();
      setScore(isCorrect ? score + 1 : score);
      if (currentQuestion < getCurrentQuestionData().question.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    } else {
      alert('Please select an answer.');
    }
  };

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setIsOpen(false);
  };

  return (
    <div className="quiz-container mx-auto max-w-2xl p-4">
      <div className="dropdown relative">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {selectedLanguage || "Select a Programming Language"}
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

      {quizCompleted ? (
        <div className="score-container text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">Your Score: {score} / {getCurrentQuestionData().question.length}</p>
          <div className="progress-bar mt-4">
            <div
              className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${(score / getCurrentQuestionData().question.length) * 100}%` }}
            >
              {Math.round((score / getCurrentQuestionData().question.length) * 100)}%
            </div>
          </div>
        </div>
      ) : (
        selectedLanguage && (
          <>
            {getCurrentQuestionData() ? (
              <>
                <div className="question-container">
                  <h2 className="text-xl font-medium mb-4">
                    Question {currentQuestion + 1}
                  </h2>
                  <fieldset className="mb-5 mt-10">
                    <div className="text-base font-medium text-gray-900 mb-5">
                      {getCurrentQuestion()}
                    </div>
                    <ul className="list-none">
                      {getCurrentChoices().map((choice, i) => (
                        <li key={i} className="flex items-center mb-4">
                          <input
                            id={`question-option-${i + 1}`}
                            type="radio"
                            name="choices"
                            value={i}
                            className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                            aria-labelledby={`question-option-${i + 1}`}
                            aria-describedby={`question-option-${i + 1}`}
                            checked={selectedAnswer === i}
                            onChange={() => setSelectedAnswer(i)}
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
                  </fieldset>

                  <div className="button-container flex justify-between mt-4">
                    <button
                      className="py-2 px-4 bg-gray-200 text-gray-500 mr-3 rounded-md hover:bg-gray-300 disabled:opacity-50"
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    >
                      Previous
                    </button>

                    <button
                      className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      onClick={handleAnswerSubmit}
                    >
                      {currentQuestion === getCurrentQuestionData().question.length - 1 ? "Submit Quiz" : "Next Question"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center mt-4">No questions available in {selectedLanguage} yet.</p>
            )}
          </>
        )
      )}
    </div>
  );
};

export default QuizComponent;
