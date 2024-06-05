import React, { useState } from 'react';

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    language: '',
    category: '',
    questions: [],
    choices: [],
    correctAnswerIndex: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      [name]: value,
    }));
  };

  const addQuestion = () => {
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, ''],
      choices: [...prevQuiz.choices, []],
      correctAnswerIndex: [...prevQuiz.correctAnswerIndex, -1],
    }));
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[index] = value;
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: updatedQuestions,
    }));
  };

  const handleChoicesChange = (qIndex, cIndex, value) => {
    const updatedChoices = [...newQuiz.choices];
    updatedChoices[qIndex][cIndex] = value;
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      choices: updatedChoices,
    }));
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedCorrectAnswerIndex = [...newQuiz.correctAnswerIndex];
    updatedCorrectAnswerIndex[qIndex] = value;
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      correctAnswerIndex: updatedCorrectAnswerIndex,
    }));
  };

  const saveQuiz = () => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
    setNewQuiz({
      language: '',
      category: '',
      questions: [],
      choices: [],
      correctAnswerIndex: [],
    });
  };

  return (
    <div className="manage-quiz-container p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Quizzes</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Language
        </label>
        <input
          type="text"
          name="language"
          value={newQuiz.language}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={newQuiz.category}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {newQuiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question {qIndex + 1}
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choices
            </label>
            {newQuiz.choices[qIndex]?.map((choice, cIndex) => (
              <input
                key={cIndex}
                type="text"
                value={choice}
                onChange={(e) => handleChoicesChange(qIndex, cIndex, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
              />
            ))}
            <button
              className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={() =>
                setNewQuiz((prevQuiz) => {
                  const updatedChoices = [...prevQuiz.choices];
                  updatedChoices[qIndex] = [...updatedChoices[qIndex], ''];
                  return {
                    ...prevQuiz,
                    choices: updatedChoices,
                  };
                })
              }
            >
              Add Choice
            </button>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correct Answer Index
            </label>
            <input
              type="number"
              value={newQuiz.correctAnswerIndex[qIndex]}
              onChange={(e) => handleCorrectAnswerChange(qIndex, parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      ))}
      <button
        className="mt-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
        onClick={addQuestion}
      >
        Add Question
      </button>
      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 ml-2"
        onClick={saveQuiz}
      >
        Save Quiz
      </button>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Existing Quizzes</h2>
        {quizzes.map((quiz, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{quiz.language} - {quiz.category}</h3>
            {quiz.questions.map((q, qIndex) => (
              <div key={qIndex} className="ml-4">
                <p>Question: {q}</p>
                <p>Choices: {quiz.choices[qIndex].join(', ')}</p>
                <p>Correct Answer: {quiz.choices[qIndex][quiz.correctAnswerIndex[qIndex]]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuiz;
