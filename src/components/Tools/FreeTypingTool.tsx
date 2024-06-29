"use client";

// TypingTestTool component
import React, { useState, useRef } from 'react';

const TypingTestTool: React.FC = () => {
    const [text, setText] = useState<string>(''); // Predefined text for typing test
    const [userInput, setUserInput] = useState<string>('');
    const [timer, setTimer] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUserInput(value);

        // Start the timer when the user starts typing
        if (!startTime) {
            setStartTime(Date.now());
            const interval = setInterval(() => {
                setTimer(Math.floor((Date.now() - startTime!) / 1000));
            }, 1000);

            return () => clearInterval(interval);
        }

        // Calculate WPM
        const words = value.trim().split(/\s+/).length;
        const minutes = timer / 60;
        const wpmCalc = Math.floor(words / minutes);
        setWpm(wpmCalc);
    };

    const resetTest = () => {
        setText('');
        setUserInput('');
        setTimer(0);
        setStartTime(null);
        setWpm(0);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Typing Test Tool</h2>
            <div className="mb-4">
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows={4}
                    placeholder="Start typing here..."
                    value={userInput}
                    onChange={handleInputChange}
                    ref={inputRef}
                />
            </div>
            <div className="flex justify-between mb-4">
                <div>Time: {timer} seconds</div>
                <div>WPM: {wpm}</div>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
                onClick={resetTest}
            >
                Reset
            </button>
        </div>
    );
};

export default TypingTestTool;
