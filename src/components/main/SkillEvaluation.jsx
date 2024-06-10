import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

const SkillEvaluation = () => {
    const [questions, setQuestions] = useState([]); // All fetched questions
    const [filteredQuestions, setFilteredQuestions] = useState([]); // Questions filtered by language
    const [selectedLanguage, setSelectedLanguage] = useState(""); // Default to an empty string
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const location = useLocation();
    const stateData = location.state?.formData;
    console.log("baysera bado nw ")
    // console.log(stateData)
    const programmingLanguages = stateData.techStacks;

    // Fetch questions from the API on component mount
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/quiz');
                setQuestions(response.data); // Store all questions
                console.log(response.data, "Fetched Questions");
            } catch (err) {
                console.error('Error fetching questions:', err);
            }
        };
        fetchQuestions();
    }, []);

    // Filter questions by selected language

    const filterQuestionsByLanguage = (allQuestions, language) => {
        const filtered = allQuestions.filter(q => {
            // Check if the language property is defined and is a string
            return q.language && typeof q.language === 'string' && q.language.toLowerCase() === language.toLowerCase();
        });
        setFilteredQuestions(filtered);
        setCurrentQuestion(0); // Reset to first question for the new language
        setSelectedAnswer(null); // Clear any selected answer
        setScore(0); // Reset the score for the new quiz
        setQuizCompleted(false); // Reset quiz completion status
    };

    // Handle language change and start quiz
    const handleLanguageClick = (language) => {
        setSelectedLanguage(language);
        filterQuestionsByLanguage(questions, language);
        setIsOpen(false); // Close the dropdown
        setQuizStarted(true); // Mark the quiz as started
    };

    // Toggle dropdown menu visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Get current question data
    const getCurrentQuestionData = () => {
        if (filteredQuestions.length === 0) return null;
        return filteredQuestions[currentQuestion];
    };

    // Get current question text
    const getCurrentQuestion = () => {
        const questionData = getCurrentQuestionData();
        return questionData ? questionData.question : '';
    };

    // Get current choices
    const getCurrentChoices = () => {
        const questionData = getCurrentQuestionData();
        return questionData ? questionData.choices : [];
    };

    // Get correct answer index
    const getCorrectAnswerIndex = () => {
        const questionData = getCurrentQuestionData();
        return questionData ? questionData.correctAnswerIndex : -1;
    };

    // Handle answer selection
    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            // Adjust score if the previous question was answered correctly
            if (selectedAnswer !== null && selectedAnswer === getCorrectAnswerIndex()) {
                setScore(prevScore => prevScore - 1);
            }
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null);
        }
    };

    // Handle answer submission
    const handleAnswerSubmit = () => {
        if (selectedAnswer !== null) {
            const isCorrect = selectedAnswer === getCorrectAnswerIndex();

            // Update the score
            setScore(prevScore => {
                const newScore = isCorrect ? prevScore + 1 : prevScore;

                // If it's the last question, trigger quiz completion
                if (currentQuestion === filteredQuestions.length - 1) {
                    handleQuizCompletion(newScore);
                }

                return newScore;
            });

            // Move to the next question if not the last one
            if (currentQuestion < filteredQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
            }
        } else {
            alert('Please select an answer.');
        }
    };


    // Handle quiz completion
    const handleQuizCompletion = async (finalScore) => {
        try {
            const techStackToUpdate = selectedLanguage; // Assuming tech stack corresponds to the selected language

            // Send the final score to the backend
            const response = await axios.put('http://localhost:3001/api/profile/updateScoreByUsername', {
                username: stateData.username, // Assuming username is available in stateData
                techStack: techStackToUpdate,
                newScore: finalScore
            });

            if (response.status === 200) {
                console.log('Score updated successfully: ', finalScore);
            } else {
                console.error('Failed to update score:', response.data);
            }
        } catch (error) {
            console.error('Error updating score:', error);
            alert('Failed to update score. Please try again.');
        }
        setQuizCompleted(true); // Mark the quiz as completed
    };



    // Skip quiz handler
    const handleSkipQuiz = () => {
        window.location.href = "/";
    };

    return (
        <div className="quiz-container mx-auto max-w-2xl p-4">
            {/* Dropdown for selecting programming language */}
            <div className="dropdown relative mb-4">
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
                        className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 absolute top-full left-0"
                    >
                        {programmingLanguages.map((language) => (
                            <li key={language}>
                                <a className="block text-gray-700 hover:bg-blue-100 p-2" onClick={() => handleLanguageClick(language)}>
                                    {language}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Skip Quiz button, shown only if the quiz has not started */}
            {!quizStarted && (
                <div className="text-center mb-4">
                    <button
                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700"
                        onClick={handleSkipQuiz}
                    >
                        Skip Quiz
                    </button>
                </div>
            )}

            {/* Display the number of questions available in the selected language */}
            {selectedLanguage && !quizStarted && (
                <div className="text-center mb-4">
                    <p className="text-lg">
                        {filteredQuestions.length > 0
                            ? `This quiz contains ${filteredQuestions.length} question(s) in ${selectedLanguage}.`
                            : `No questions available for ${selectedLanguage} yet.`}
                    </p>
                </div>
            )}

            {/* Quiz logic */}
            {quizCompleted ? (
                <div className="score-container text-center mt-10">
                    <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                    <p className="text-xl mb-4">Your Score: {score} / {filteredQuestions.length}</p>
                    <div className="w-full bg-gray-200 rounded-full">
                        <div
                            className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{ width: `${(score / filteredQuestions.length) * 100}%` }}
                        >
                            {Math.round((score / filteredQuestions.length) * 100)}%
                        </div>
                    </div>
                </div>
            ) : (
                quizStarted && filteredQuestions.length > 0 && (
                    <div className="question-container">
                        {/* Display current question number and total questions */}
                        <div className="text-center mb-4">
                            <p className="text-lg font-semibold">
                                {selectedLanguage} Quesions
                            </p>
                        </div>

                        {/* Display the current question */}
                        <h2 className="text-xl font-medium mb-4">
                            {currentQuestion + 1}.  {getCurrentQuestion()}
                        </h2>

                        <fieldset className="mb-5 mt-10">
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
                                onClick={() => handlePreviousQuestion()}
                            >
                                Previous
                            </button>
                            <button
                                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                onClick={handleAnswerSubmit}
                            >
                                {currentQuestion === filteredQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default SkillEvaluation;