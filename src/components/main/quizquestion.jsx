// QuizQuestions.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const QuizQuestions = ({ languageId }) => {
  const selectedlanguage = useParams();
  const [questions, setQuestions] = useState([]);



  useEffect(() => {
  const fetchQuestions = async () => {
    

    try {
      
    const response = await axios.get('http://localhost:3001/api/quiz');
      setQuestions(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log(questions);
    }
  };

  fetchQuestions();
}, []);

const filteredQuestions = questions.filter((question) => question.language === "Java");
console.log(filteredQuestions)
console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")



  const addQuestion = () => {
    // Logic to add a new question
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/quiz/${questionId}`); // Replace with your actual API endpoint
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
  
      if (response.status === 200) {
        onDeleteSuccess(); // Callback function to handle successful deletion on UI
      } else {
        console.error('Error deleting question:', response.data);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };
  


  const updateQuestion = (questionId) => {
    // Logic to update a question
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`/quizzes/${quizId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDeleteSuccess(); // Callback function to handle successful deletion on UI
      } else {
        console.error('Error deleting quiz:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };
  
    const navigate = useNavigate();
  
    const handleNewQuestionClick = () => {
      navigate('./new'); 
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Quiz Questions</h2> 
      <ul className="list-disc">  
        {filteredQuestions.map((question, index) => (
          <li key={question.id} className="border border-gray-300 rounded p-4 mb-4"> 
          {console.log(question._id)}
         { console.log("theekkkkkkkkkk")}
            <h3 className="text-xl font-medium mb-2">{index + 1 }. {question.question}</h3> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
              <span className="flex flex-row text-gray-700">A. {question.choices[0]}</span>
              <span className="text-gray-700">B. {question.choices[1]}</span>
              <span className="text-gray-700">C. {question.choices[2]}</span>
              <span className="text-gray-700">D. {question.choices[3]}</span>
            </div>
            <div className="flex justify-end mt-4"> 
              <button className="bg-green-500 text-white hover:bg-green-700 px-4 py-2 rounded mr-2">Update</button>  
              <button onClick={() => handleDeleteQuestion(question.id)} className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded">Delete</button>

            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleNewQuestionClick} className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">Add Question</button>
    </div>
  );
  
};

export default QuizQuestions;
