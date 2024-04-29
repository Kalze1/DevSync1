import React, { useState } from 'react';
import { Picker } from 'emoji-mart';

const EmojiPicker = () => {
    const [emoji, setEmoji] = useState('');

    const handleEmojiSelect = (emojiObject) => {
        setEmoji(emojiObject.native);
    };

    return (
        <div>
            <Picker onEmojiSelect={handleEmojiSelect} />
            <div>Selected Emoji: {emoji}</div>
        </div>
    );
};

export default EmojiPicker;