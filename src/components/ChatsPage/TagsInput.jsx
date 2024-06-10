import React, { useState } from 'react';
// import './TagsInput.css'; // Make sure to import the CSS file

const TagsInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue) {
            e.preventDefault();
            if (!tags.includes(inputValue)) {
                setTags([...tags, inputValue]);
                setInputValue('');
            }
        } else if (e.key === 'Backspace' && !inputValue && tags.length) {
            setTags(tags.slice(0, -1));
        }
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="tags-input-container">
            <input
                className="input input-bordered tags-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
            />
            {tags.map((tag, index) => (
                <div key={index} className="tag">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(index)}>
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TagsInput