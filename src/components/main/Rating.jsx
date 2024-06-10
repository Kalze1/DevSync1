import React, { useState } from 'react';
import axios from 'axios';

const Rating = ({ username }) => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };
    console.log("the inputed rating is: ", rating)

    const handleSubmit = async () => {
        try {
            await axios.put('http://localhost:3001/api/users/rating', {
                username,
                rating: Number(rating),
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    return (
        <div>
            {submitted ? (
                <p>Thank you for your rating!</p>
            ) : (
                <div>
                    <h3>Rate {username}</h3>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={handleRatingChange}
                    />
                    <button onClick={handleSubmit}>Submit Rating</button>
                </div>
            )}
        </div>
    );
};

export default Rating;