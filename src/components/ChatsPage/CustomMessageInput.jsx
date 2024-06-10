import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';



const CustomMessage = ({ message }) => {
    const isCodeSnippet = message.text.startsWith('```') && message.text.endsWith('```');
    const codeContent = message.text.slice(3, -3).trim();

    return (
        <div>
            <div>{message.sender.username}</div>
            {isCodeSnippet ? (
                <SyntaxHighlighter language="javascript" style={coy}>
                    {codeContent}
                </SyntaxHighlighter>
            ) : (
                <div>{message.text}</div>
            )}
            <div>{new Date(message.created).toLocaleString()}</div>
        </div>
    );
}


export default CustomMessage;
